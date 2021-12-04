---
title: "COVID OUTBREAK ANALYSIS"
description: "DataCamp's Guided Project visualizing the trends of the spread and cummulative increase"
author: "Peter Boshe"
date: '2021-09-18'
categories: ["R"]
tags: ["R programming","Visualization","Data Analysis"]
output:
  blogdown::html_document:
    toc: true
    toc_depth: 2
    toc_float: 
      collapsed: false
      smooth_scroll: true
summary: "This a Guided Project hosted by DataCamp to analyse and visualize the the trends in spread and significant events during the COVID outbreak"
draft: true
---



## 1. From epidemic to pandemic
<p><img style="float: left; margin:5px 20px 5px 1px; width:40%" src="https://www.nps.gov/aboutus/news/images/CDC-coronavirus-image-23311-for-web.jpg?maxwidth=650&autorotate=false"></p>
<p>In December 2019, COVID-19 coronavirus was first identified in the Wuhan region of China. By March 11, 2020, the World Health Organization (WHO) categorized the COVID-19 outbreak as a pandemic. A lot has happened in the months in between with major outbreaks in Iran, South Korea, and Italy. </p>
<p>We know that COVID-19 spreads through respiratory droplets, such as through coughing, sneezing, or speaking. But, how quickly did the virus spread across the globe? And, can we see any effect from country-wide policies, like shutdowns and quarantines? </p>
<p>Fortunately, organizations around the world have been collecting data so that governments can monitor and learn from this pandemic. Notably, the Johns Hopkins University Center for Systems Science and Engineering created a <a href="https://github.com/RamiKrispin/coronavirus">publicly available data repository</a> to consolidate this data from sources like the WHO, the Centers for Disease Control and Prevention (CDC), and the Ministry of Health from multiple countries.</p>
<p>In this notebook, you will visualize COVID-19 data from the first several weeks of the outbreak to see at what point this virus became a global pandemic.</p>
<p><em>Please note that information and data regarding COVID-19 is frequently being updated. The data used in this project was pulled on March 17, 2020, and should not be considered to be the most up to date data available.</em></p>


|    Date    | Cummulative Confirmed Cases |
|:----------:|:---------------------------:|
| 2020-01-22 |             555             |
| 2020-01-23 |             653             |
| 2020-01-24 |             941             |
| 2020-01-25 |            1434             |
| 2020-01-26 |            2118             |
| 2020-01-27 |            2927             |
| 2020-01-28 |            5578             |
| 2020-01-29 |            6166             |
| 2020-01-30 |            8234             |
| 2020-01-31 |            9927             |
| 2020-02-01 |            12038            |
| 2020-02-02 |            16787            |
| 2020-02-03 |            19881            |
| 2020-02-04 |            23892            |
| 2020-02-05 |            27635            |
| 2020-02-06 |            30817            |
| 2020-02-07 |            34391            |
| 2020-02-08 |            37120            |
| 2020-02-09 |            40150            |
| 2020-02-10 |            42762            |
| 2020-02-11 |            44802            |
| 2020-02-12 |            45221            |
| 2020-02-13 |            60368            |
| 2020-02-14 |            66885            |
| 2020-02-15 |            69030            |
| 2020-02-16 |            71224            |
| 2020-02-17 |            73258            |
| 2020-02-18 |            75136            |
| 2020-02-19 |            75639            |
| 2020-02-20 |            76197            |
| 2020-02-21 |            76823            |
| 2020-02-22 |            78579            |
| 2020-02-23 |            78965            |
| 2020-02-24 |            79568            |
| 2020-02-25 |            80413            |
| 2020-02-26 |            81395            |
| 2020-02-27 |            82754            |
| 2020-02-28 |            84120            |
| 2020-02-29 |            86011            |
| 2020-03-01 |            88369            |
| 2020-03-02 |            90306            |
| 2020-03-03 |            92840            |
| 2020-03-04 |            95120            |
| 2020-03-05 |            97882            |
| 2020-03-06 |           101784            |
| 2020-03-07 |           105821            |
| 2020-03-08 |           109795            |
| 2020-03-09 |           113561            |
| 2020-03-10 |           118592            |
| 2020-03-11 |           125865            |
| 2020-03-12 |           128343            |
| 2020-03-13 |           145193            |
| 2020-03-14 |           156097            |
| 2020-03-15 |           167449            |
| 2020-03-16 |           181531            |
| 2020-03-17 |           197146            |

## 2. Confirmed cases throughout the world
<p>The table above shows the cumulative confirmed cases of COVID-19 worldwide by date. Just reading numbers in a table makes it hard to get a sense of the scale and growth of the outbreak. Let's draw a line plot to visualize the confirmed cases worldwide.</p>


```r
# Draw a line plot of cumulative cases vs. date
# Label the y-axis
ggplot(confirmed_cases_worldwide, aes(x = date, y = cum_cases)) +
  geom_line() +
  ylab("Cumulative confirmed cases")
```

<div class="figure" style="text-align: center">
<img src="{{< blogdown/postref >}}index_files/figure-html/confirmed cases-1.png" alt="Figure 1.1 confirmed cases throughout the world" width="288" />
<p class="caption">(\#fig:confirmed cases)Figure 1.1 confirmed cases throughout the world</p>
</div>

## 3. China compared to the rest of the world
<p>The y-axis in that plot is pretty scary, with the total number of confirmed cases around the world approaching 200,000. Beyond that, some weird things are happening: there is an odd jump in mid February, then the rate of new cases slows down for a while, then speeds up again in March. We need to dig deeper to see what is happening.</p>
<p>Early on in the outbreak, the COVID-19 cases were primarily centered in China. Let's plot confirmed COVID-19 cases in China and the rest of the world separately to see if it gives us any insight.</p>
<p><em>We'll build on this plot in future tasks. One thing that will be important for the following tasks is that you add aesthetics within the line geometry of your ggplot, rather than making them global aesthetics.</em></p>


```r
# Read in datasets/confirmed_cases_china_vs_world.csv
confirmed_cases_china_vs_world <- read_csv("datasets/confirmed_cases_china_vs_world.csv")
## Rows: 112 Columns: 4
## -- Column specification --------------------------------------------------------
## Delimiter: ","
## chr  (1): is_china
## dbl  (2): cases, cum_cases
## date (1): date
## 
## i Use `spec()` to retrieve the full column specification for this data.
## i Specify the column types or set `show_col_types = FALSE` to quiet this message.
# See the result
glimpse(confirmed_cases_china_vs_world)
## Rows: 112
## Columns: 4
## $ is_china  <chr> "China", "China", "China", "China", "China", "China", "China~
## $ date      <date> 2020-01-22, 2020-01-23, 2020-01-24, 2020-01-25, 2020-01-26,~
## $ cases     <dbl> 548, 95, 277, 486, 669, 802, 2632, 578, 2054, 1661, 2089, 47~
## $ cum_cases <dbl> 548, 643, 920, 1406, 2075, 2877, 5509, 6087, 8141, 9802, 118~
# Draw a line plot of cumulative cases vs. date, colored by is_china
# Define aesthetics within the line geom
plt_cum_confirmed_cases_china_vs_world <- ggplot(confirmed_cases_china_vs_world) +
  geom_line(aes(x = date, y = cum_cases, color = is_china)) +
  ylab("Cumulative confirmed cases")

# See the plot
plt_cum_confirmed_cases_china_vs_world
```

<img src="{{< blogdown/postref >}}index_files/figure-html/china vs world-1.png" width="50%" style="display: block; margin: auto 0 auto auto;" />

## 4. Let's annotate!
<p>Wow! The two lines have very different shapes. In February, the majority of cases were in China. That changed in March when it really became a global outbreak: around March 14, the total number of cases outside China overtook the cases inside China. This was days after the WHO declared a pandemic.</p>
<p>There were a couple of other landmark events that happened during the outbreak. For example, the huge jump in the China line on February 13, 2020 wasn't just a bad day regarding the outbreak; China changed the way it reported figures on that day (CT scans were accepted as evidence for COVID-19, rather than only lab tests).</p>
<p>By annotating events like this, we can better interpret changes in the plot.</p>


```r
who_events <- tribble(
  ~ date, ~ event,
  "2020-01-30", "Global health\nemergency declared",
  "2020-03-11", "Pandemic\ndeclared",
  "2020-02-13", "China reporting\nchange"
) %>%
  mutate(date = as.Date(date))

# Using who_events, add vertical dashed lines with an xintercept at date
# and text at date, labeled by event, and at 100000 on the y-axis
plt_cum_confirmed_cases_china_vs_world +
  geom_vline(data = who_events, aes(xintercept = date), linetype = "dashed") +
  geom_text(data = who_events, aes(date, label = event),y = 1e5  )
```

<img src="{{< blogdown/postref >}}index_files/figure-html/significant events-1.png" width="672" style="display: block; margin: auto;" />

## 5. Adding a trend line to China
<p>When trying to assess how big future problems are going to be, we need a measure of how fast the number of cases is growing. A good starting point is to see if the cases are growing faster or slower than linearly.</p>
<p>There is a clear surge of cases around February 13, 2020, with the reporting change in China. However, a couple of days after, the growth of cases in China slows down. How can we describe COVID-19's growth in China after February 15, 2020?</p>


```r
# Filter for China, from Feb 15
china_after_feb15 <- confirmed_cases_china_vs_world %>%
 filter(is_china == "China", date >= "2020-02-15")


# Using china_after_feb15, draw a line plot cum_cases vs. date
# Add a smooth trend line using linear regression, no error bars
ggplot(china_after_feb15, aes(date,cum_cases)) +
  geom_line() +
  geom_smooth(method = "lm", se = FALSE) +
  ylab("Cumulative confirmed cases")
## `geom_smooth()` using formula 'y ~ x'
```

<img src="{{< blogdown/postref >}}index_files/figure-html/unnamed-chunk-1-1.png" width="672" style="display: block; margin: auto;" />

## 6. And the rest of the world?
<p>From the plot above, the growth rate in China is slower than linear. That's great news because it indicates China has at least somewhat contained the virus in late February and early March.</p>
<p>How does the rest of the world compare to linear growth?</p>


```r
# Filter confirmed_cases_china_vs_world for not China
not_china <-  confirmed_cases_china_vs_world %>% filter(is_china == "Not China")
# Using not_china, draw a line plot cum_cases vs. date
# Add a smooth trend line using linear regression, no error bars
plt_not_china_trend_lin <- ggplot(not_china, aes(date,cum_cases)) +
  geom_line() +
  geom_smooth(method = "lm",se = FALSE) +
  ylab("Cumulative confirmed cases")

# See the result
plt_not_china_trend_lin 
## `geom_smooth()` using formula 'y ~ x'
```

<img src="{{< blogdown/postref >}}index_files/figure-html/unnamed-chunk-2-1.png" width="672" style="display: block; margin: auto;" />

## 7. Adding a logarithmic scale
<p>From the plot above, we can see a straight line does not fit well at all, and the rest of the world is growing much faster than linearly. What if we added a logarithmic scale to the y-axis?</p>


```r
# Modify the plot to use a logarithmic scale on the y-axis
plt_not_china_trend_lin + 
  scale_y_log10()
## `geom_smooth()` using formula 'y ~ x'
```

<img src="{{< blogdown/postref >}}index_files/figure-html/unnamed-chunk-3-1.png" width="672" style="display: block; margin: auto;" />

## 8. Which countries outside of China have been hit hardest?
<p>With the logarithmic scale, we get a much closer fit to the data. From a data science point of view, a good fit is great news. Unfortunately, from a public health point of view, that means that cases of COVID-19 in the rest of the world are growing at an exponential rate, which is terrible news.</p>
<p>Not all countries are being affected by COVID-19 equally, and it would be helpful to know where in the world the problems are greatest. Let's find the countries outside of China with the most confirmed cases in our dataset.</p>


```r
# Run this to get the data for each country
confirmed_cases_by_country <- read_csv("datasets/confirmed_cases_by_country.csv")
## Rows: 13272 Columns: 5
## -- Column specification --------------------------------------------------------
## Delimiter: ","
## chr  (2): country, province
## dbl  (2): cases, cum_cases
## date (1): date
## 
## i Use `spec()` to retrieve the full column specification for this data.
## i Specify the column types or set `show_col_types = FALSE` to quiet this message.
glimpse(confirmed_cases_by_country)
## Rows: 13,272
## Columns: 5
## $ country   <chr> "Afghanistan", "Albania", "Algeria", "Andorra", "Antigua and~
## $ province  <chr> NA, NA, NA, NA, NA, NA, NA, NA, NA, NA, NA, NA, NA, NA, NA, ~
## $ date      <date> 2020-01-22, 2020-01-22, 2020-01-22, 2020-01-22, 2020-01-22,~
## $ cases     <dbl> 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ~
## $ cum_cases <dbl> 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ~
# Group by country, summarize to calculate total cases, find the top 7
top_countries_by_total_cases <- confirmed_cases_by_country %>%
  group_by(country)  %>% 
  summarize(total_cases = max(cum_cases))  %>% 
  top_n(7)
## Selecting by total_cases
# See the result
top_countries_by_total_cases
## # A tibble: 7 x 2
##   country      total_cases
##   <chr>              <dbl>
## 1 France              7699
## 2 Germany             9257
## 3 Iran               16169
## 4 Italy              31506
## 5 Korea, South        8320
## 6 Spain              11748
## 7 US                  6421
```

## 9. Plotting hardest hit countries as of Mid-March 2020
<p>Even though the outbreak was first identified in China, there is only one country from East Asia (South Korea) in the above table. Four of the listed countries (France, Germany, Italy, and Spain) are in Europe and share borders. To get more context, we can plot these countries' confirmed cases over time.</p>
<p>Finally, congratulations on getting to the last step! If you would like to continue making visualizations or find the hardest hit countries as of today, you can do your own analyses with the latest data available <a href="https://github.com/RamiKrispin/coronavirus">here</a>. </p>


```r
# Read in the dataset from datasets/confirmed_cases_top7_outside_china.csv
confirmed_cases_top7_outside_china <- read_csv("datasets/confirmed_cases_top7_outside_china.csv")
## Rows: 2030 Columns: 3
## -- Column specification --------------------------------------------------------
## Delimiter: ","
## chr  (1): country
## dbl  (1): cum_cases
## date (1): date
## 
## i Use `spec()` to retrieve the full column specification for this data.
## i Specify the column types or set `show_col_types = FALSE` to quiet this message.
# Glimpse at the contents of confirmed_cases_top7_outside_china
glimpse(confirmed_cases_top7_outside_china)
## Rows: 2,030
## Columns: 3
## $ country   <chr> "Germany", "Iran", "Italy", "Korea, South", "Spain", "US", "~
## $ date      <date> 2020-02-18, 2020-02-18, 2020-02-18, 2020-02-18, 2020-02-18,~
## $ cum_cases <dbl> 16, 0, 3, 31, 2, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13,~
# Using confirmed_cases_top7_outside_china, draw a line plot of
# cum_cases vs. date, colored by country
ggplot(confirmed_cases_top7_outside_china, aes(date, cum_cases, color = country))+
    geom_line()
```

<img src="{{< blogdown/postref >}}index_files/figure-html/unnamed-chunk-5-1.png" width="672" style="display: block; margin: auto;" />

