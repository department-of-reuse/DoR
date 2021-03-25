# DoR
The Department of Reuse tracks and documents reuse of artifacts in computer science (starting with the SE field)

No clear ontology of reuse so we define one.

## Reuse Taxonomy/Coding Guide v 0.1
Link semantics of reuse (the edges in DOR). 
* Stepping stones (comparison of SOTA) e.g. DL model precision since they are so slow.
- [x] Tool reuse - Sonarqube, Kla's ESD tool
- [x] Dataset reuse - Promise etc
* Metric reuse - MCC, Mccabe, etc.
* Statistical reuse - https://github.com/klainfo/ScottKnottESD 
* Protocol reuse - SLR, Grounded Theory
* Replication of experiments
* Sanity Check reuse - justification for why this approach works or is reasonable (e.g. Promise and Perils paper)

## Possible Tim Rules
- must be an SE artifact being reused
- no more than 10 years old
- requires a description in the paper ("I use a t-test") vs 2 pages on Scott-Knott
- Citation and reference (e.g. Student’s T-test)
- does it take up **space** within a paper (e.g. at least 1 paragraph)

## not reuse
- drive by references, refs "in the air"
- not old (but what about NASA dataset from 2002)
- motivational references (X also did J)
- reuse of a closed dataset
- expensively licenced tools like Coverity, Q1, Simulink, Matlab?
- datasets created solely for the paper e.g. 

## shortcuts
- "baseline is X"
- ignore related work? 


## Grey Areas
- justifications for why an approach is reasonable, e.g. why stop words were chosen ("all these people also did it"). The degree of substantiveness seems important.
- reusing libraries (SKLearn/JMetal) vs reusing methods (SVM/NSGA2)


