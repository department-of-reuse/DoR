# DoR
The Department of Reuse tracks and documents reuse of artifacts in computer science (starting with the SE field).

- Currently (Aug'21) we have covered around 40% of the papers from the main technical track of the six main SE conferences (listed below)
- Our short term teractical goal is to analyze 200, 2000, 5000 papers in 2021, 2022, 2023 (respectively) by which time we would have covered most of the major SE conferences in the last five years. 
  - If you want to help with that, see "Getting Invloved" (below).
- After that, our long term strategic  goal is  to read 500 (ish) papers per year to keep up to date with the conferences.
  - Based on results so far,  then assuming each paper is read by two people, that strategic goal would be achievable by a team of twenty people working two hours per month on this task.

## Using this Data



At the time of this writing (August 2021) it is our judgement that there is not enough data here, yet, to do things like (e.g.) topological studies on the nature of SE science. That said, at our current rate of data collection, we should be at that stage by end 2021.

## Accessing Our Data
 Researchers can access all the data from this project at the following places:

- The primary source of data for the website is:
https://raw.githubusercontent.com/bhermann/DoR/main/department-of-reuse/src/assets/data/reuse.json 
- It is composed from all the CSV files in:
https://github.com/bhermann/DoR/tree/main/workflow/done
- The transformation process run as a build step is:
https://github.com/bhermann/DoR/blob/main/department-of-reuse/scripts/data-transformation.ts
- There is a separate script  used when checking new results to catch common mistakes:
https://github.com/bhermann/DoR/blob/main/department-of-reuse/scripts/check-reuse.ts



## Colelction Details
This data was collected as follows:

- We targeted papers from the 2020 technical programs of six major international SE conferences: 
    - International Software Engineering (ICSE), Automated Software Engineering (ASE), Joint European Software Engineering Conference / Foundations of Software Engineering (ESEC/FSE), Software Maintenance and Engineering (ICSME), Mining Software Repositories (MSR), and Empirical Software Engineering and Measurement (ESEM).     - These conferences were selected
using advice from [prior work](https://arxiv.org/pdf/1608.08100.pdf) but our vision is to expand; for example, by looking at all top-ranked SE conferences. 
- GitHub issues were used to divide up the hundreds of papers from those conferences into “work packets" of ten papers each. 
- -Reading teams were set up from software engineering research teams from around the globe in Hong Kong, Istanbul (Turkey), Victoria (Canada), Gothenburg (Sweden), Oulu (Finland), Melbourne (Australia), and Raleigh (USA). 
- Team members would assign themselves work packets and then read the papers looking for the kinds of reuse enumerated below.
  - _Stepping Stones_: Most papers have to benchmark their new ideas against some prior recent state-of-the-art paper. That is, they reuse old papers as stepping stones towards new results.
  -  _Advnaced States_ Here we do not mean “we use a two-tailed t-test” or some other decades-old widely-used statistical method. Rather, we refer instead to statistical methods for recent papers that propose statistical guidance for the kinds of analysis seen in SE . Perhaps because this kind of analysis is very rare, these people are exceedingly high cited
  - _Metrics and Method descriptions_ (which may be guidelines, with no tools);
  - _Data sets_
   -  _Sanity checks_ (justification for why a particular approach works or is reasonable to avoid bad data);
   - Software packages of the kind currently being reviewed by SE conference artifact evaluation committees (tools and replications).
   - Of course, there any [many other items being reused](https://pasteboard.co/Ke4tKgO.png) than those  six listed above3. It is an open question, worthy of future work, to check if those other items can be collected in this way.
- Once completed, a second person (from any of our teams) would do the same and check for consistency. 
- Fleiss Kappa statistics are then computed to track the level of reader disagreement. 
-  All interaction was done via the [GitHub issue system](https://github.com/bhermann/DoR/projects/2),




## Want to get involved?

If you want to speed up our data collection, why not get involved?

