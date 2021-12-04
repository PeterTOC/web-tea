#!/usr/bin/Rscipt

args = commandArgs(trailingOnly=TRUE)


#converting and making copy in destination specified in second arg

args[2] = rmarkdown:::convert_ipynb(args[1])
xfun::file_string(args[2])

#removing the jupyter file
rm(list = ls(args1))
