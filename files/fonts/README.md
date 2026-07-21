Luciole package
===============

## Description

This package provides four Unicode Math text fonts `Luciole-*.ttf` and
a companion maths font `Luciole-Math.otf`.  
They have been developed explicitly for visually impaired people
and are the result of a collaboration between the Regional Technical Center
for Visual Impairment, the type-design studio typographies.fr and
the mathematician Daniel Flipo. The Luciole project received a grant from
the Swiss Ceres Foundation and the PEP69 association, and support from
the DIPHE laboratory at the Université Lumière Lyon 2 and the association
GUTenberg.

## Contents

* Luciole-Regular.ttf, Luciole-Regular-Italic.ttf, Luciole-Bold.ttf and
  Luciole-BoldItalic.ttf  TrueType Text fonts
* Luciole-Math.otf        OpenType Math font
* Luciole-Math-Bold.otf   Bold variant (limited coverage)
* luciole-math.sty        LaTeX style file for Luciole-Math.otf
* Luciole.fontspec        Defaults for Text fonts
* Luciole-Doc.pdf         Documentation in PDF format
* Luciole-Doc.ltx         Source of Luciole-Math.pdf
* unimath-luciole.pdf     Modified version of unimath-symbols.pdf
                          showing available Luciole-Math symbols compared
                          to other Maths fonts,
* unimath-luciole.ltx     Source of unimath-luciole.pdf
* README.md               (this file)

## Installation

This package `Luciole’ is meant to be installed automatically by TeXLive,
MikTeX, etc. Otherwise,  can be installed under TEXMFHOME or TEXMFLOCAL, f.i.
text and math fonts in directory texmf-local/fonts/truetype/public/luciole/,
and luciole-math.sty, Luciole.fontspec in directory
texmf-local/tex/latex/luciole/.  
Documentation files and their sources can go to directory
texmf-local/doc/fonts/public/luciole/

Don't forget to rebuild the file database (mktexlsr or so) if you install
under TEXMFLOCAL.

Finally, make the system font database aware of the Luciole fonts
(fontconfig under Linux).

## License

* The Text fonts `Luciole-*.ttf` are licensed under the Creative Common CC-BY
Font License,
* The font `Luciole-Math.otf` is licensed under the SIL Open Font License,
Version 1.1. This license is available with a FAQ at:
http://scripts.sil.org/OFL
* The other files are distributed under the terms of the LaTeX Project
Public License from CTAN archives in directory macros/latex/base/lppl.txt.
Either version 1.3c or, at your option, any later version.

## Changes

* First public version: 0.40

* v0.50
  - internal: \widearc reencoded for compatibility with my other math fonts.
  - cv00 (unavailable) replaced by cv11 to access slashed zeros.
  - `luciole-math.sty` tunes \TeX, \LaTeX, \LaTeXe logos for the Luciole fonts; 
  option "no-logos" added to prohibit their redefinition.

* v0.55
  - Internal: \std@equal redefined, redefinition of \std@minus removed.
  - Most horizontal arrows and harpoons are now stretchable.
  - Fixed kernings between ([{ and \mij, \mity.
  - Math table fixed for glyphs horizontal and vertical composition.

* v0.60
  - Improved design of large parentheses.
  - Invisible Math operators (U-2061 to U+2064) added.
  - Compatibility with Typst v0.14: all glyphs used in vertical compositions
    now sit on the baseline.
  - Documentation fixes.

* v0.70
  - Script variant added for calligraphic capitals.
  - Circle, diamond and lozenge operators : sizes enlarged.
  - Brackets redesigned.
  - Math table Sub/Superscripts parameters tuned, see
	https://tex.stackexchange.com/questions/759695/
  - Math table fraction parameters tuned.
  - Fixed spaces' width (U+2000 to U+200B and U+205F).
  - Variation Selectors (U-FE00 and U+FE01) added; they work on all Math
    symbols listed on
    https://www.unicode.org/Public/UCD/latest/ucd/StandardizedVariants.txt 
	which are available in Luciole Math fonts (U+FE01 provides access to
    script variants of the default calligraphic capitals (Chancery like).
  - Documentation fixes.

* v0.71
  - Superscripts for calligraphic capitals redesigned.
	
---
Copyright 2024-2026  Laurent Bourcellier, Jonathan Fabreguettes, Daniel Flipo
E-mail: daniel (dot) flipo (at) free (dot) fr
