



remotes::install_github('rstudio/blogdown')
# load packages -----------------------------------------------------------
library(blogdown)
install_hugo()

# create new site ---------------------------------------------------------
new_site(theme = 'puresyntax71/hugo-theme-chunky-poster',
         format = 'toml')


# set up default author settings ------------------------------------------

options(blogdown.ext = ".Rmd", blogdown.author = "Peter Boshe",
        blogdown.subdir = "post")


# serve site --------------------------------------------------------------

serve_site()

# to see why the site is not built ----------------------------------------

check_site()
n
