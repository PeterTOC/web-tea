#!/usr/bin/Rscript

args = commandArgs(trailingOnly=TRUE)

blogdown::new_post(title = args[1],
                   author = "Peter Boshe",
                   ext = '.Rmd', 
                   subdir = "post")


