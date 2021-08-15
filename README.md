<img width=1000 src="https://user-images.githubusercontent.com/29195/129488040-41c20d47-06fc-4e2a-b1ff-baf009555a3e.png">

# DoR
The Department of Reuse tracks and documents reuse of artifacts in computer science (starting with the SE field). 

In any field,
finding   the _leading edge_ of 
research   is
an on-going challenge.
If no one agrees on what is the state-of-the-art then:

- Researchers cannot  appease reviewers  
- Educators cannot teach to the leading edge of their field
- Reseachers cannot step off from the leading edge to find even better results.


Here, we assume that the _leading_ edge can be found amongst artifacts that are heavily reused.
Our goal is to map out that leading edge  and reward its contribtorsL

- Researchers that reuse the most from other papers will be applauded and awarded a _R-index_ (reuse index);
- Researchers that build the artifacts that are most reused will be applauded
(even louder) and be awarded an _R<sup>+</sup>-index_ indicating that they are the people
producing the artifacts that are most used by the rest of the community.

We are building that map using methods that are community _comprehensible_, community _verifiable_, and  
community
_correctable_,

- All the data used for our reuse graphs is community-collected. 
- All the data can be audited at  this site} and if errors are detected, issue reports can be raised in our GitHub repository (and the error  corrected). 

<img align=right width=300 src="https://user-images.githubusercontent.com/29195/129488071-7fa01c49-efa3-464a-b501-48806a518552.png">

## Progress Report

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
- Team members would assign themselves work packets and then read the papers looking for the six kinds of reuse listed below. Of course, there any [many other items being reused](https://pasteboard.co/Ke4tKgO.png) than these  six (and  it is an open question, worthy of future work, to check if those other items can be collected in this way):
  - _Stepping Stones_: Most papers have to benchmark their new ideas against some prior recent state-of-the-art paper. That is, they reuse old papers as stepping stones towards new results.
  -  _Advnaced States_ Here we do not mean “we use a two-tailed t-test” or some other decades-old widely-used statistical method. Rather, we refer instead to statistical methods for recent papers that propose statistical guidance for the kinds of analysis seen in SE . Perhaps because this kind of analysis is very rare, these people are exceedingly high cited
  - _Metrics and Method descriptions_ (which may be guidelines, with no tools);
  - _Data sets_
  -  _Sanity checks_ (justification for why a particular approach works or is reasonable to avoid bad data);
  - _Software packages_ of the kind currently being reviewed by SE conference artifact evaluation committees (tools and replications).

- Once completed, a second person (from any of our teams) would do the same and check for consistency. 
- Fleiss Kappa statistics are then computed to track the level of reader disagreement. 
-  All interaction was done via the [GitHub issue system](https://github.com/bhermann/DoR/projects/2),




## Want to get involved?

 If that work interests you, then there are many ways you can get involved:

-  If you are a researcher and wish to check that we have accurately recorded your contribution,
please visit please check our graph at https://reuse-dept.org.  
- If you want to apply reuse graphs
to your community, please use the tools in this repo.
- If you are interested in joining this initiative and contributing to an up-to-minute snapshot of SE research, then please 
    - Take our [how-to-read-for-reuse tutorial](https://github.com/bhermann/DoR/blob/main/workflow/training.md);
    - Then visit our  [control dashboard](https://github.com/bhermann/DoR/projects/2) abd
find an issue with no one's face on it, and assign yourself a task.
- Better yet, if you are an educator teaching a graduate SE class, then get your students to do the following three week reading assignments,

## Using thiese tools for Graduate SE education

Start by telling students
that understanding the current state of the art will be their challenge for the rest of their career.  Using reuse graphs,   
it is possible for a community to find and maintain a
shared understanding of that state-of-the-art. To demonstrate this, get them to:

- First,
learn this reuse graph approach 
by  performing  our standard  [how-to-read-for-reuse tutorial](https://github.com/bhermann/DoR/blob/main/workflow/training.md);
- Then in week 2, read some papers to find their reuse (if any);
  - Visit our  [control dashboard](https://github.com/bhermann/DoR/projects/2) 
  - Find an issue with no one's face on it, 
  - Assign yourself a task.
- Finally,  in week 3,   they should  check someone else's reuse findings from other papers (checking in their results to our repo, of course(
 
As a result, students will join an international team exploring reuse in SE that will keep them informed and updated about the state-of-the-art in SE for many years to come. Also, as a side-effect, they will also see first hand the benefit of open source tools that can be shared by teams working around the globe.
 
