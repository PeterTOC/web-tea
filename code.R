



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

blogdown::serve_site()

# to see why the site is not built ----------------------------------------

blogdown::check_site()
n
blogdown::stop_server()

# new post ----------------------------------------------------------------

blogdown::new_post(title = 'covid_outbreak_analysis2.Rmd')

# learning material  link-------------------------------------------------------

https://www.youtube.com/watch?v=0GZxidrlaRM&list=PLLAZ4kZ9dFpOnyRlyS-liKL5ReHDcj4G3&index=6
