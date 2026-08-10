# Sailing at ASU — Static Website

A dependency-free static version of the Sailing at ASU website. It works directly on **GitHub Pages** with no framework, package manager, database, or build step.

## The important part: semester updates are easy

Recurring site content is separated from the HTML layout.

```text
assets/js/site-data.js
```

is the file you will normally edit when the board or club information changes.

You do **not** need to rebuild board cards in `index.html` each semester.

## Files

```text
sundevil-sailing-static/
├── index.html
├── .nojekyll
├── README.md
└── assets/
    ├── css/
    │   └── styles.css
    ├── js/
    │   ├── site-data.js       <- board + club information
    │   └── main.js            <- page behavior/rendering
    └── images/
        ├── burgee.png
        ├── team-photo.jpg
        └── board headshots...
```

## Update the board for a new semester

### 1. Upload the new headshots

Put them in:

```text
assets/images/
```

For example:

```text
assets/images/jane-doe.jpg
assets/images/john-smith.jpg
```

### 2. Open `assets/js/site-data.js`

The board is stored under `boardTerms`:

```js
{
  term: "Fall 2026",
  members: [
    {
      name: "Jane Doe",
      role: "President",
      image: "assets/images/jane-doe.jpg",
      bio: "Jane's description for this semester."
    },
    {
      name: "John Smith",
      role: "Treasurer",
      image: "assets/images/john-smith.jpg",
      bio: "John's description for this semester."
    }
  ]
}
```

Each member can have a completely different name, title, image, and description every semester.

### 3. Set the current semester

Near the top of `site-data.js`, change:

```js
currentBoardTerm: "Fall 2026",
```

The page automatically displays that board.

## Keep old boards as an archive

You can leave previous semester objects inside `boardTerms` and add the newest semester above them.

When there is more than one board term, the website **automatically adds a semester dropdown** to the Board section. Visitors can then switch between current and previous boards.

If you do not want an archive, simply replace the existing board entry each semester instead.

## Update club information

The Membership, Practice, and Regatta cards also live in `assets/js/site-data.js` under:

```js
information: [ ... ]
```

Each card has:

- `title` — card heading
- `intro` — one-sentence summary
- `highlights` — clean label/value rows for important facts
- `detail` — additional explanation

For example, changing practice time requires editing only:

```js
{ label: "Thursday", value: "6:00 PM · Water" }
```

No HTML layout changes are needed.

## Change the main/team image

Replace:

```text
assets/images/team-photo.jpg
```

with a new image using the same filename.

## Change colors

Open `assets/css/styles.css` and edit the variables at the top:

```css
:root {
  --maroon: #8c1d40;
  --maroon-dark: #5c1129;
  --gold: #ffc627;
}
```

## Run locally

You can double-click `index.html`, or from this directory run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish with GitHub Pages

1. Create a GitHub repository.
2. Upload/push everything in this folder to the repository root.
3. Open **Settings → Pages** in GitHub.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select your main branch and `/ (root)`.
6. Save.

## Use `sundevilsailing.com` later

Once the GitHub Pages version is working, configure the domain under **Settings → Pages → Custom domain**. GitHub will provide the DNS records to use with your domain registrar.

Do not point the live domain at GitHub until the new site is ready.

## Notes

- All displayed site images are local files.
- External links still go to their normal destinations.
- There are no third-party JavaScript or CSS dependencies.
- The board layout supports different bio lengths and different board sizes without manually changing the grid.
