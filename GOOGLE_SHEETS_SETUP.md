# Google Sheets Setup - Pracuj Radar Email List

## Krok 1: Stwórz nowy Google Sheet

1. Otwórz https://sheets.google.com
2. Kliknij "+ Blank" żeby stworzyć nowy arkusz
3. Nazwij go np. "Pracuj Radar - Email Lista"

## Krok 2: Przygotuj kolumny

W pierwszym wierszu stwórz nagłówki:
- A1: `email`
- B1: `timestamp`

## Krok 3: Stwórz Google Apps Script

1. W arkuszu kliknij **Extensions** → **Apps Script**
2. Usuń domyślny kod i wklej:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    // Add new row with email and timestamp
    sheet.appendRow([
      data.email,
      data.timestamp || new Date().toISOString()
    ]);

    return ContentService.createTextOutput(JSON.stringify({
      success: true
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Kliknij **Save** (ikona dyskietki)
4. Nazwij projekt np. "Pracuj Radar API"

## Krok 4: Deploy jako Web App

1. Kliknij **Deploy** → **New deployment**
2. Kliknij ikonę koła zębatego → wybierz **Web app**
3. Wypełnij:
   - Description: "Pracuj Radar Email Collection"
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Kliknij **Deploy**
5. Zaakceptuj uprawnienia (kliknij swoje konto Google → Advanced → Go to [project name])
6. **SKOPIUJ URL** - będzie wyglądał jak:
   ```
   https://script.google.com/macros/s/XXXXXX/exec
   ```

## Krok 5: Dodaj URL do projektu

1. Stwórz plik `.env.local` w folderze `pracuj-radar`:
   ```bash
   NEXT_PUBLIC_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/TWOJ_URL/exec
   ```

2. Lub dodaj zmienną środowiskową na Vercel:
   - Otwórz projekt na https://vercel.com
   - Settings → Environment Variables
   - Dodaj:
     - Name: `NEXT_PUBLIC_GOOGLE_SHEETS_URL`
     - Value: Twój URL ze skryptu
     - Environment: Production, Preview, Development
   - Kliknij **Save**

## Krok 6: Redeploy na Vercel

Po dodaniu zmiennej środowiskowej:
```bash
vercel --prod --yes
```

## Testowanie

1. Otwórz stronę: https://pracuj-radar.vercel.app
2. Wpisz email i kliknij "Dołącz"
3. Sprawdź Google Sheet - nowy email powinien się pojawić!

## Troubleshooting

**Problem: Emaile się nie zapisują**
- Sprawdź czy URL w Apps Script jest poprawny
- Sprawdź czy w Apps Script wybrałeś "Anyone" w "Who has access"
- Otwórz Developer Console w przeglądarce (F12) i sprawdź błędy

**Problem: CORS errors**
- Google Apps Script automatycznie obsługuje CORS, ale upewnij się że deploy jest jako "Web app" z dostępem "Anyone"

**Problem: Brak uprawnień**
- Podczas deploymentu Apps Script musisz zaakceptować uprawnienia
- Kliknij "Advanced" → "Go to [project name]" → "Allow"
