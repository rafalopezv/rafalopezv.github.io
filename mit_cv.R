# about: visual representation of my cv
# later arrangements were made in Keynote

library(waffle)
library(hrbrthemes)
library(tidyverse)

# create data
study <-
  tibble(months = factor(rep(month.abb[1:12], 72), levels=month.abb[1:12])) %>%   
  slice(4:(n()-9)) %>%  
  tibble(
    age = rep(0:70, each = 12) 
  ) %>%
  rowid_to_column("row_name") %>% 
  mutate(year = 1983 + age) 
  

## what I did when
study %>%
  mutate(
    what = case_when(
      age < 5 ~ "ninez",
      age < 17 ~ "colegio",
      age < 21 ~ "uni",
      year < 2007 ~ "nada",
      year < 2009 ~ "master",
      year < 2010 ~ "nada1",
      year < 2011 ~ "japan_uk",
      year < 2014 ~ "nada2",
      year < 2016 ~ "alemania",
      year < 2017 ~ "nada3",
      year < 2018 ~ "nada4",
      year < 2019 ~ "nada5",
      year < 2020 ~ "nada5",
      year < 2021 ~ "micro",
      year < 2022 ~ "mit",
      T ~ "nadano"
    )
  ) -> temp

temp %>% 
  select(what) %>% 
  unique() %>% 
  mutate(order = 1:nrow(.)) -> temp1

# waffle chart
temp %>%
  count(what) %>%
  left_join(temp1, .) %>% 
  arrange(order) %>% 
  mutate(what = as.factor(what)) %>% 
  ggplot(aes(fill = fct_reorder(what, order), values = n)) +
  geom_waffle(n_rows = 12, size = 0.33, colour = "white", flip = F) +
  scale_fill_manual(
    name = NULL,
    values = c("#04304D", "#74743A", "#723B2B", "lightgray", "#FF6B31", "lightgray", 
               "#F3C748", "lightgray", "#021C2E", "lightgray", "lightgray", "lightgray", 
               "#2D95B5", "#0F0F09", "#404045")
  ) +
  coord_equal() +
  theme_ipsum_rc(grid="") +
  theme_enhance_waffle() +
  theme(legend.position = "none") 

ggsave("/Users/rafalopezv/Desktop/study.png", width = 15, height = 8)  

