#!/bin/bash

# default
sass --no-source-map lib/index.scss lib/layout.css && lib/bin/fl.js optimize lib/layout.css

# with reverse
sass --no-source-map lib/reverse.scss lib/reverse.css && lib/bin/fl.js optimize lib/reverse.css

# base, without media queries
sass --no-source-map lib/base.scss lib/base.css && lib/bin/fl.js optimize lib/base.css
