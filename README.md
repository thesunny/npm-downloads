# NPM Downloads

This project is used to make charts from NPM downloads.

The download script is designed to work in any operating system that can run a `.sh` bash file.

## Setup

After cloning run `pnpm install`

```sh
git clone https://github.com/thesunny/npm-downloads.git
cd npm-downloads
pnpm install
```

## Getting Started

To display the charts execute this:

```sh
pnpm dev
```

Then open a browser at <http://localhost:3000/>

## To add new data

Download data from npm by going into the `data` directory of the project then running...

```
./fetsh-npm-data.sh [package-name]
```

Note that it will download data within a specific date range defined in the `.sh` file. We constrain the date range so that all the downloads are consistent. Otherwise, it makes it difficult to comopare them.

where `[package-name]` is the NPM package name that you wish to download data for.

Once you've downloaded all the packages, create a subdirectory under `data` if one doesn't already exist.

Copy all the downloaded `.json` files into that directory or into a directory that already exists.

Once you've done this, when you go to <http://localhost:3000> you will see all the subdirectories in `data` that you can click on. When you click on one, it will show a chart.
