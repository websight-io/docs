# Test

# WebSight.io documentation
WebSight documentation created using [MkDocs Material](https://squidfunk.github.io/mkdocs-material/getting-started/) project.

## Setup
1. Install Python
2. Install PIP (for Windows) or PIP3 (for Mac or Linux)
3. Run command:  
   * On Windows: `pip install -r requirements.txt`
   * On Mac/Linux: `pip3 install -r requirements.txt`

## Commands
* `mkdocs build`      - Build the MkDocs documentation
* `mkdocs gh-deploy`  - Deploy your documentation to GitHub Pages
* `mkdocs new`        - Create a new MkDocs project
* `mkdocs serve`      - Run the builtin development server

## Project layout
    mkdocs.yml    # The configuration file.
    theme/        # Custom templates, overrides, styles and assets
    docs/
        index.md  # The documentation homepage.
        ...       # Other markdown pages, images and other files.

## Diagrams as code
Diagrams could be created using [PlantUML](https://plantuml.com) - see files with `puml` extension.

To create/update diagrams:
Install PlantUML with required dependencies (on mac: `brew install plantuml`).

Run
```bash
plantuml -Djava.awt.headless=true src/*puml -o ../generated/
```

from the parent directory of src (assuming src contains diagrams .puml files) to regenerate diagrams.

## Further reading
- [MkDocs Material Site](https://squidfunk.github.io/mkdocs-material/getting-started/)
- [MkDocs Site](https://www.mkdocs.org)
- [MkDocs Awesome Pages](https://github.com/lukasgeiter/mkdocs-awesome-pages-plugin)
- [MkDocs Blogging](https://liang2kl.codes/mkdocs-blogging-plugin/)
