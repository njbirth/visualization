# Project: Bundestag / German parliament

**Final project for the lecture Visualization.**

## Task

> * this task is formulated for the German parliament, but can of course be applied/translated to other countries as well
> * gather data about the members of the Bundestag, including party affiliation, date of birth, Wahlkreis or Landesliste, since when they are members of parliament
> * each MP should have a small profile page
> * each party should have a profile page, giving the number of MPs and their list
> * a global alphabetical list of MPs
> * other possible task: for some (possibly fictional) votes show how each member voted, for each party give statistics on how their members voted
> * realization like the bibliography network task for instance as static HTML file collection via XML and Python

## Website

You can access a hosted version of the website on [https://njbirth.github.io./visualization](https://njbirth.github.io/visualization).

If you want to run it yourself, you need node.js and npm to be installed on your system. After that you can just switch to the `website` folder, run `npm install` and `npm run dev`. After some compilation steps, you should be able to access the website on `localhost:5000`. If you run into memory issues, try `export NODE_OPTIONS=--max_old_space_size=4096`.

## Data

### Sources

- General: [Bundestag OpenData](https://www.bundestag.de/services/opendata)
- [MP data ("Stammdaten")](https://www.bundestag.de/resource/blob/472878/5ff47798a24a5e729d0d116f2d4c6bb2/MdB-Stammdaten-data.zip)
- [Vote data](https://www.bundestag.de/parlament/plenum/abstimmung/liste)
- [GeoJSON data](https://github.com/okfde/wahldaten/tree/master/geometrien/wahlkreise)
- [Election data](https://www.govdata.de/suchen/-/details/bundestagswahl-2017)

The version of the MP data we used is from 2021-03-12. Please note that Nikolas Löbel left the parliament on 2021-03-10, while his replacement, Kordula Kovac, joined on 2021-03-17. Therefore, in our data the Bundestag has only 708 MPs and not 709.

See [Acknowledgements.svelte](https://github.com/njbirth/visualization/blob/main/website/src/Acknowledgements.svelte) for more information (or [https://njbirth.github.io/visualization](https://njbirth.github.io/visualization) -> Quellen und Lizenzen, if you want a prettier version of the file).

### Directory structure

```
/data
├── _raw
│   ├── votes
|   |   └── ...
│   └── MDB_STAMMDATEN.XML
├── __converted
│   ├── votes
|   |   ├── meta.json
|   |   └── ...
│   └── MDB_STAMMDATEN.json
├── ___final
│   ├── meta.json
│   ├── votes.json
│   └── MDB_STAMMDATEN.json
├── img
│   └── ...
├── map
│   └── ...
└── preprocess_data.ipynb
```

The data in the `raw` folder is directly taken from the above mentioned sources. We converted this files to JSON/CSV, because we found it more convenient to work with (using [this XML to JSON converter](https://www.utilities-online.info/xmltojson); for XLSX to CSV we just opened the file with LibreOffice Calc and saved it again as CSV). The `final` folder contains the data that we got after further processing of the converted data (also see `preprocess_data.ipynb`). `__converted/votes/meta.json` contains metadata to the votes, which is used by the Jupyter notebook. `___final/meta.json` was generated by hand and contains some party metadata for the website. (The underscores in the directory names are just for the alphabetical ordering). `img` contains URLs for the MP portraits and a notebook to obtain then. `map` includes election data that is used for the map (kind of obvious).
