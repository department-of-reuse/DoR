# Reuse Taxonomy/Coding Guide v 0.2

_Important note: before doing this, please to the [Training](training.md)_

## Coding Instructions  
- Thanks for agreeing to participate! 
- Process:
  1.  [ ] Browse the [issue list](https://github.com/bhermann/DoR/issues) and assign yourself to an open issue. Change the label to **initial review**. 
  2.  [ ] Download the corresponding CSV file from the [todo](https://github.com/bhermann/DoR/tree/main/workflow/todo) folder for the work package associated with that issue (in the title). 
  3.  [ ] Scan the relevant papers (ask us if you need access to PDFs) and do the coding. 
  4. [ ] Make a copy of the [template provided](results-sample.csv) to document the reuse you see on each row. In some cases a reference may be 2 types of reuse (e.g. a replication and a dataset). That should be 2 separate rows. We have found between 2-10 types of reuse on average, so every DOI would have 2-10 rows.
  5.  [ ] Once you are done with the papers in the issue
      - move the CSV file to the [done](https://github.com/bhermann/DoR/tree/main/workflow/todo) folder
      - name your results CSV file **wp-XX-results.csv** and put it in the [underreview](https://github.com/bhermann/DoR/tree/main/workflow/underreview) folder  (where XX refers to the work package id like "ae")
      - change the issue label from initial review to **check work package**
  6. [ ] Once you've done your own package, then go review someone else's  **check work package**. 
         - This will mean discussing the results with the author of the initial package results. 
         - Once you get agreement, update  **wp-XX-results.csv** and then
            -  relabel the issue **tell ben** 
            -  Move the package into [done](https://github.com/bhermann/DoR/tree/main/workflow/done

### Coding Notes
- It's taken from 10-20 mins to scan a paper for reuse. If you are taking more than 20 mins you are doing too thorough a job. 
- Capture the explicit DOI: must be an actual DOI that resolves with doi.org. Do not just use the reference number.
- Capture, if DOI does not exist, the alternate link: either a URL, or arXiv id.
- Please add comments on type of reuse, especially if the reuse category was unclear. 
- Indicate approx section (page number, section heading) where the reuse happens so we can go back and verify it.
- DOIs can be encoded either with the locator prefix (`https://doi.org/10.1145/3368089.3409717`) or without (`10.1145/3368089.3409717`). It's very easy to drop DOI elements so be careful with the copy/paste process.

## Link semantics of reuse (the edges in DOR, called "reuse_type" in the sample). 

* **Stepping stones** (comparison of SOTA) e.g. DL model precision since they are so slow.
* **Tool** reuse - Sonarqube, Kla's ESD tool. Tools also include survey instruments (questions).
* **Dataset** reuse - Promise etc. Dataset must be public.
* **Metric** reuse - MCC, McCabe, etc.
* **Statistical** reuse - reuse of a statistical approach, e.g. https://github.com/klainfo/ScottKnottESD . Do not include references to stats that are 'in the air' and commonly used, such as Fisher's exact test, Pearson correlation, etc. One hint this is happening is if the citation is "drive-by" instead of fully explained, or if it is quite old.
* **Method** reuse - reuse of a specific methodological approach, such as Kitchenham's SLR, Grounded Theory (Stol and Fitzgerald).
* **Replication** of experiments - the paper clearly indicates it follows the approach from an earlier paper.
* **Sanity Check** reuse - justification for why this approach works or is reasonable (e.g. Promise and Perils paper). Some people might include 'defensive' citations to justify why their method is valid. 

## What is Not Reuse?

- drive by references, refs "in the air" (i.e. shared by all the community)
- motivational references (X also did J)
- reuse of a closed dataset
- expensively licenced tools like Coverity, Q1, Simulink, Matlab
- datasets created solely for the paper e.g. Microsoft search logs
- general background on algorithms e.g. SVM 
- comparison to related work unless they specifically reuse something from that work

## Possible Analysis Shortcuts

- "baseline is X" statements usually indicate reuse.
- Related work sections often have lots of citations but little reuse.
- Look for citations [] but not always... sometimes papers reuse with reference to a URL.
- Sections on results, conclusions, threats often not very important for reuse
- Don't get too caught up in the paper itself! We are looking only for reuse, not at what the paper is doing.

## Grey Areas

These are places where the reuse is unclear. Make a note for future discussion.

- Justifications for why an approach is reasonable, e.g. why stop words were chosen ("all these people also did it"). The degree of substantiveness seems important.
- Reusing libraries (SKLearn/JMetal) vs reusing methods (SVM/NSGA2). For example, Mann-Whitney occurs as `R` library `wilcox.test`. But just using the library is not tool reuse.
- We don't want to exclude non-SE reuse.
