# Tooling script to convert provided input data into the expected format 
## Manage dependencies 
dependencies <- c("tidyverse", "retractcheck", "rcrossref", "jsonlite")
install.packages(setdiff(dependencies, rownames(installed.packages())))  
library(tidyr)
library(dplyr)

## Read input data
inputFile <- "./input/20210203-Menzies.xlsx"
inputData <- readxl::read_xlsx(inputFile)

## Transform input data to expected format
inputData <- inputData %>% 
                  select(Doi1, Doi2) %>% 
                  rename(reused = Doi1, reusing = Doi2)

## Filter on valid DOIs
inputData <- inputData %>% filter(retractcheck::check_doi(reused) & retractcheck::check_doi(reusing))

## Amend data from CrossRef
cr_data <- rcrossref::cr_works(c(inputData$reused, inputData$reusing))[["data"]]

## Transform to output data
outputData <- tibble(reused = tibble(), reusing = tibble())
for (i in 1:nrow(inputData)) {
  cr_reused <- cr_data %>% filter(tolower(doi) == tolower(inputData$reused[i])) %>% slice_head()
  cr_reusing <- cr_data %>% filter(tolower(doi) == tolower(inputData$reusing[i])) %>% slice_head()
  
  if (nrow(cr_reused) == 1 & nrow(cr_reusing) == 1) {
    outputData <- outputData %>% add_row(reused = cr_reused , reusing = cr_reusing)
  }
  logging::loginfo("Test")
}
## Write 
outputJson <- jsonlite::toJSON(outputData)
jsonlite::minify(outputJson)

jsonlite::write_json(outputData, "./output/reuse.json")
