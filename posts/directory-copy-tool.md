---
title: "Toolcrafting: Recursive Directory Copying"
tags: 
 - rust
 - toolcrafting
blurb: 
 I wanted to host my 11ty-generated site on Github pages without screwing around with
 Github Actions. My solution was two separate repos, with one controlling the 11ty
 project and the other hosting the static sites for Github Pages. As you can imagine,
 this had lead to some headaches. I addressed this using my new ADHD obsession, Rust.
---
 # Toolcrafting: Recursive Directory Copying
 This (glorious) site is generated using 11ty, which is a fantastic static site generator.

 I wanted to use Github Pages to actually serve the site instead of AWS S3 buckets, but I also wanted to avoid Github Actions if I could. My solution?

 *Two Repos*

 One repo handles the actual 11ty project that produces the static HTML. The other is just the static HTML, which is the repo that Github pages is active on.

 ### My Deployment Pipeline
 The way that my deployment worked prior to this tool was a little barbaric, but it worked:
 1. Make some changes to the site in the 11ty project
 2. Generate the static HTML
 3. Copy the static HTML pages to the other repo
 4. Push changes to the 11ty repo
 5. Push changes to the static site repo

 In the spirit of never doing anything by hand, I wanted to automate the copying of my generated site to its respective repo. Instead of a one-line Bash script, I spent three day's worth of free time writing a recursive directory copy tool in Rust. Let's explore it.