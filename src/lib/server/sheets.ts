import { google, type sheets_v4 } from "googleapis";
import {
  ORDER_HEADERS,
  ORDER_STATUS_OPTIONS,
  ORDERS_TAB,
  PANDIT_HEADERS,
  PANDIT_STATUS_OPTIONS,
  PANDIT_TAB,
  applicationToRow,
  orderToRow,
  rowToApplication,
  rowToOrder,
} from "@/lib/sheets-contract";
import type { Order, PanditApplication } from "@/types";

const SCOPE = "https://www.googleapis.com/auth/spreadsheets";

type SheetClient = { sheets: sheets_v4.Sheets; spreadsheetId: string };

export function sheetsConfigured() {
  return Boolean(process.env.GOOGLE_SERVICE_ACCOUNT_JSON && process.env.GOOGLE_SHEETS_SPREADSHEET_ID);
}

function client(): SheetClient {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  if (!raw || !spreadsheetId) {
    throw new Error("Google Sheets is not configured.");
  }
  const creds = JSON.parse(raw) as { client_email: string; private_key: string };
  const auth = new google.auth.JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: [SCOPE],
  });
  return { sheets: google.sheets({ version: "v4", auth }), spreadsheetId };
}

function strings(values: unknown[] | undefined) {
  return (values ?? []).map((value) => (value == null ? "" : String(value)));
}

async function sheetId(api: SheetClient, title: string) {
  const meta = await api.sheets.spreadsheets.get({ spreadsheetId: api.spreadsheetId });
  return meta.data.sheets?.find((sheet) => sheet.properties?.title === title)?.properties?.sheetId;
}

async function ensureTab(api: SheetClient, title: string, headers: readonly string[], statusColumn: number, labels: string[]) {
  let id = await sheetId(api, title);
  if (id == null) {
    const added = await api.sheets.spreadsheets.batchUpdate({
      spreadsheetId: api.spreadsheetId,
      requestBody: { requests: [{ addSheet: { properties: { title } } }] },
    });
    id = added.data.replies?.[0]?.addSheet?.properties?.sheetId ?? undefined;
  }
  if (id == null) throw new Error(`Could not open the ${title} tab.`);

  const header = await api.sheets.spreadsheets.values.get({
    spreadsheetId: api.spreadsheetId,
    range: `'${title}'!1:1`,
  });
  const existing = strings(header.data.values?.[0]);
  const matches = headers.every((name, index) => existing[index] === name);
  if (!matches) {
    await api.sheets.spreadsheets.values.update({
      spreadsheetId: api.spreadsheetId,
      range: `'${title}'!A1`,
      valueInputOption: "RAW",
      requestBody: { values: [Array.from(headers)] },
    });
  }

  await api.sheets.spreadsheets.batchUpdate({
    spreadsheetId: api.spreadsheetId,
    requestBody: {
      requests: [
        {
          setDataValidation: {
            range: { sheetId: id, startRowIndex: 1, endRowIndex: 500, startColumnIndex: statusColumn, endColumnIndex: statusColumn + 1 },
            rule: {
              condition: { type: "ONE_OF_LIST", values: labels.map((label) => ({ userEnteredValue: label })) },
              showCustomUi: true,
              strict: true,
            },
          },
        },
      ],
    },
  });
}

/** Creates both tabs, header rows, and status dropdowns when they are missing. */
export async function ensureSheets() {
  const api = client();
  await ensureTab(api, ORDERS_TAB, ORDER_HEADERS, 15, ORDER_STATUS_OPTIONS.map((option) => option.label));
  await ensureTab(api, PANDIT_TAB, PANDIT_HEADERS, 18, PANDIT_STATUS_OPTIONS.map((option) => option.label));
}

async function headersReady(api: SheetClient, tab: string, headers: readonly string[]) {
  try {
    const header = await api.sheets.spreadsheets.values.get({
      spreadsheetId: api.spreadsheetId,
      range: `'${tab}'!1:1`,
    });
    const existing = strings(header.data.values?.[0]);
    return headers.every((name, index) => existing[index] === name);
  } catch {
    return false;
  }
}

async function append(tab: string, headers: readonly string[], row: string[]) {
  const api = client();
  if (!(await headersReady(api, tab, headers))) await ensureSheets();
  await api.sheets.spreadsheets.values.append({
    spreadsheetId: api.spreadsheetId,
    range: `'${tab}'!A1`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [row] },
  });
}

async function findRow(tab: string, reference: string) {
  const api = client();
  const result = await api.sheets.spreadsheets.values.get({
    spreadsheetId: api.spreadsheetId,
    range: `'${tab}'!A:Z`,
  });
  const rows = result.data.values ?? [];
  const found = rows.slice(1).find((row) => String(row[0] ?? "").trim() === reference);
  return found ? strings(found) : undefined;
}

export function appendOrder(order: Order) {
  return append(ORDERS_TAB, ORDER_HEADERS, orderToRow(order));
}

export function appendPanditApplication(application: PanditApplication) {
  return append(PANDIT_TAB, PANDIT_HEADERS, applicationToRow(application));
}

export async function getSheetOrder(reference: string) {
  if (!sheetsConfigured()) return undefined;
  const row = await findRow(ORDERS_TAB, reference);
  return row ? rowToOrder(row) : undefined;
}

export async function getSheetPanditApplication(reference: string) {
  if (!sheetsConfigured()) return undefined;
  const row = await findRow(PANDIT_TAB, reference);
  return row ? rowToApplication(row) : undefined;
}
