# Detect Unused Packages (dup)

This script scans your project directory to identify potentially unused npm packages listed in your `package.json` file.

## Features

- Scans JavaScript, TypeScript, and Vue files for import statements
- Identifies packages listed in `package.json` but not imported in the codebase
- Lists all scanned files for transparency
- Provides summary statistics on package usage

## Prerequisites

- Node.js (version 14.0.0 or later recommended for ES6 module support)

## Installation

1. Copy the `dup.js` file into your project's root directory.

## Usage

Run the script from your project's root directory:

```bash
node dup.js
```

## Output

The script will produce the following output:

1. A list of all files checked
2. A list of potentially unused packages
3. Summary statistics including:
   - Total files checked
   - Total packages in package.json
   - Number of used packages
   - Number of potentially unused packages

## Customization

You can modify the following variables in the script to fit your project structure:

- `ignoredDirs`: Directories to ignore during the scan
- `fileExtensions`: File types to include in the scan

## Limitations

- Does not detect dynamically imported packages
- May not catch packages used only for side effects
- Cannot detect usage in non-JS configuration files

Always manually verify results before removing any packages from your `package.json`.

## License

[MIT License](https://opensource.org/licenses/MIT)
