# Reuse Taxonomy/Coding Guide v 0.3

_Important note: before doing this, please to the [Training](training.md)_

## Coding Instructions  
- Thanks for agreeing to participate!
- Process:
  1. [ ] Ensure you are aware of basic Git(Hub) transactions.
  2. [ ] Browse the [issue list](https://github.com/bhermann/DoR/issues?q=is%3Aopen+is%3Aissue+label%3A%221.+data+collection%22+no%3Aassignee) and assign yourself to an open issue. You can do this by commenting with the phrase `I would like to work on this please!` on the issue. The issue will be automatically assigned to you in a matter of seconds.
  3. [ ] Download the corresponding CSV file from the [todo](https://github.com/bhermann/DoR/tree/main/workflow/todo) folder for the work package associated with that issue (in the title).
  4. [ ] Scan the relevant papers (ask us if you need access to PDFs) and do the coding.
  5. [ ] Make a copy of the [template provided](results-sample.csv) to document the reuse you see on each row. In some cases a reference may be 2 types of reuse (e.g. a replication and a dataset). That should be 2 separate rows. We have found between 2-10 types of reuse on average, so every DOI would have 2-10 rows.
        - Note down the time you took for each paper
  6. [ ] Once you are done with the papers in the issue
      - name your results CSV file **wp-XX-results.csv** (where XX refers to the work package id like "ae")
      - create a comment in your issue with the phrase `Results of Phase 1` and attach the CSV file to the comment by dragging the file into the comment box. Also add the times for each paper as recording in the previous step.
      - create another comment with the phrase `I completed this work package.`. You will be automatically unassigned from the issue and a label indicating the next phase will be applied.
  7. [ ] Once you've done your own package, then go review someone else's
         - Browse the [issue list](https://github.com/bhermann/DoR/issues?q=is%3Aopen+is%3Aissue+label%3A%222.+check+work+package%22+no%3Aassignee) and assign yourself to an open issue. You can do this by commenting with the phrase `I would like to work on this please!` on the issue. The issue will be automatically assigned to you in a matter of seconds.
         - This will mean discussing the results with the author of the initial package results.
         - Once you get agreement, update  **wp-XX-results.csv** and then
            - create a comment in your issue with the phrase `Results of Phase 2` and attach the CSV file to the comment by dragging the file into the comment box
            - create another comment with the phrase `I completed this work package.`. You will be automatically unassigned from the issue and a label indicating the next phase will be applied.
            - After an editorial check, we will move the file into the done folder. The website will magically include your results.

### Coding Notes
- It's taken from 10-20 mins to scan a paper for reuse. If you are taking more than 20 mins you are doing too thorough a job.
- Capture the explicit DOI: must be an actual DOI that resolves with doi.org. Do not just use the reference number.
- Capture, if DOI does not exist, the alternate link: either a URL, or arXiv id.
- Please add comments on type of reuse, especially if the reuse category was unclear.
- Indicate approx section (page number, section heading) where the reuse happens so we can go back and verify it.
- DOIs can be encoded either with the locator prefix (`https://doi.org/10.1145/3368089.3409717`) or without (`10.1145/3368089.3409717`). It's very easy to drop DOI elements so be careful with the copy/paste process.

## Link semantics of reuse 

(FYI: "semantics" = "reuse_type" in the edges in DOR.)

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
