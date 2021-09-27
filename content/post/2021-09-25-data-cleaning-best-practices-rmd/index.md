---
title: 'Data Cleaning in R: Best Practices'
author: 'Peter Boshe'
date: '2021-09-25'
slug: []
categories: []
tags: []
images: []
authors: []
---

#### **Data Type Constraints;**

make sure that all data is in the preferred format, eg average of charatcer values

Tools:

-   assertive (package); useful for functions that will return an error if data is not in the preferred format, ensuring efficient insight extraction. extra protection. assert_is_numeric, assert_is_character

-   dplyr(package); glimpse

-   readr(package); during import

-   string(package); convert numerical strings to numbers ie removing commas

    Note: due to the way R encodes its factors, factors need to be changed into characters before they can be changed into numbers

#### Range constraints;

These range constraints can be logical, common knowledge or provided

Tools:

-   lubridate(package);

        data %>% filter(date_column <= today())

-   ggplot2(package); a histogram with assigned breaks

        breaks <- c(min(data$column),0,5,max(data$column))
        ggplot(data, aes(column))+
            geom_histogram(breaks = breaks)

-   assertive(package);

        assert_all_are_in_past(data$date_column)

        assert_all_are_in_range(data$column, lower = 0, upper = 5)

Solutions;

-remove rows, only if the data to remove is small otherwise we will add bias to the data. by filter

-Replace with NA, replace dplyr

    replace(column, condition, replacement)

-Replace with range limit, replace dplyr

-Replace with other value based on domain knowledge

#### Uniqueness Constraints

This Range constraint is to deal with duplicates in the data.

Can be a full duplicate or a partial duplicate

Tools

-   R built-in duplicated() function that returns a logical vector, true for all the full duplicates, can also be used to count them with sum() function, also with filter

Solutions;

-Dropping full duplicates using distinct()

-Finding partial duplicates, can assign an object and use it to filter both the columns ( using %in%) which will give us the list of full duplicates and partial duplicates

    data %>% 
      count(column1, column2) %>% 
      filter(n > 1)

-dropping partial duplicates

    data %>% 
      distinct(column1, column2, .keep_all = TRUE)

-handling partial duplicates by summarising.eg mean(), max(), then removing the old unsummarised column

#### Checking Membership (Categorical Data)

Tools;

-   dplyr(function); Filtering Joins, with vector of the correct labels for categorical Data

1.  Anti-join, answers that are in A but not in B, without joining the two tables

2.  Semi-join, answers that are in A and in B, without joining the two tables

##### Categorical Data Problems

1.  Inconsistency within a category

    stringr (package); str_to_lower(),str_to_upper,str_trim()

2.  Too many categories

    forcats(package), collapsing categories;

        other_categories <- c("amphibian", "reptile","bug")
        animals %>% mutate(type_collapsed = fct_collapse(type_trimmed, other = other categories))

#### Text Data Problems

-   formatting inconsistencies

-   information inconsistencies

-   invalid data entered

Tools

stringr(package); str_detect(),str_replace_all(),str_remove_all(),str_length()

REGEX(REGular EXpressions)

### Advanced Data Problems

#### Uniformity

-   Different units or formats from data from multiple data sources or unstructured data

Tools

-   Seek for anomalies using vizualizations for each variable to be tested

-   ifelse() function with mutate for unit conversion eg; centigrade to farheineit

-   lubridate(package);

    when working with non- uniform date formats; use ?strptime in console to get list of all available date formats to pass to the orders argument

        parse_date_time(data$date_column, orders = c("%Y-%m-%d", "%m/%d/%y", "%B %d, %Y")

Note: for ambiguous dates like 6/7/2021, which might be July or June depending whether you got your data from Europe or USA respectively

#### Cross Field Validation (sanity check)
