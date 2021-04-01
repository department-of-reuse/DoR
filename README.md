# DoR
The Department of Reuse tracks and documents reuse of artifacts in computer science (starting with the SE field)

## Reuse Taxonomy/Coding Guide v 0.1
Link semantics of reuse (the edges in DOR). 
* **Stepping stones** (comparison of SOTA) e.g. DL model precision since they are so slow.
- **Tool** reuse - Sonarqube, Kla's ESD tool. Tools also include survey instruments (questions).
- **Dataset** reuse - Promise etc. Dataset must be public.
* **Metric** reuse - MCC, McCabe, etc.
* **Statistical** reuse - reuse of a statistical approach, e.g. https://github.com/klainfo/ScottKnottESD . Do not include references to stats that are 'in the air' and commonly used, such as Fisher's exact test, Pearson correlation, etc. One hint this is happening is if the citation is "drive-by" instead of fully explained, or if it is quite old.
* **Method** reuse - reuse of a specific methodological approach, such as Kitchenham's SLR, Grounded Theory (Stol and Fitzgerald).
* **Replication** of experiments - the paper clearly indicates it follows the approach from an earlier paper.
* **Sanity Check** reuse - justification for why this approach works or is reasonable (e.g. Promise and Perils paper). Some people might include 'defensive' citations to justify why their method is valid. 

## What is Not Reuse?
- drive by references, refs "in the air"
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

## Coding Instructions  
- It's taken from 10-20 mins to scan a paper for reuse. If you are taking more than 20 mins you are doing too thorough a job. 
- Use template provided to document the reuse you see on each row. In some cases a reference may be 2 types of reuse (e.g. a replication and a dataset).
- Capture the explicit DOI: must be an actual DOI that resolves with doi.org. Do not just use the reference number.
- Capture, if DOI does not exist, the alternate link: either a URL, or arXiv id.
- Please add comments on type of reuse, especially if the reuse category was unclear. 
- Indicate approx section (page number, section heading) where the reuse happens so we can go back and verify it.
