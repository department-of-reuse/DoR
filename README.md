<!--- img width=1000 src="https://user-images.githubusercontent.com/29195/129488040-41c20d47-06fc-4e2a-b1ff-baf009555a3e.png"--->


# Welcome to  Department of Reuse

<img align=right width=400 src="https://raw.githubusercontent.com/bhermann/DoR/main/department-of-reuse/src/assets/dor-logo.svg">


Here, we  tracks and document reuse of artifacts in computer science (starting with the SE field). 

Philosophers of science like  [Karp Popper](https://en.wikipedia.org/wiki/Karl_Popper) caution us that the ideas we can most trust are those that have been most tried and most tested. For that reason, many of us are involved in the process called “Science” that produces trusted knowledge by sharing one’s ideas, and trying out and testing others’ ideas. Science and scientists form communities where people do each other the courtesy of curating, clarifying, critiquing and improving a large pool of ideas.

But in any field,
finding   the _leading edge_ of 
research   is
an on-going challenge.
If no one agrees on what is the state-of-the-art then:

- Researchers cannot  appease reviewers  
- Educators cannot teach to the leading edge of their field
- Reseachers cannot step off from the leading edge to find even better results.


Here, we assume that the _leading_ edge can be found amongst artifacts that are heavily reused.
Our goal is to map out that leading edge  and reward its contribtorsL

- An _R-index_ (reuse index) score will be awarded to resaerchers  that reuse the most from other sources;
- An _R<sup>+</sup>-index_ score will be awarded to resaerchers that build the artifacts that are most reused.


We are building that map using methods that are community _comprehensible_, community _verifiable_, and  
community
_correctable_,

- All the data used for our reuse graphs is community-collected. 
- All the data can be audited at  this site} and if errors are detected, issue reports can be raised in our GitHub repository (and the error  corrected). 

 
## Progress Report



<img align=right width=200 src="https://user-images.githubusercontent.com/29195/129488096-e0eb11e7-9f0d-409b-90ab-a3b98f0edd36.png">


- Currently (Aug'21) we have covered around 40% of the papers from the main technical track of the six main SE conferences (listed below)
- Our short term **tactical goal** is to analyze 200, 2000, 5000 papers in 2021, 2022, 2023 (respectively) by which time we would have covered most of the major SE conferences in the last five years. 
  - If you want to help with that, see "Getting Invloved" (below).
- After that, our **long term strategic  goal** is  to read 500 (ish) papers per year to keep up to date with the conferences.
  - Based on results so far,  then assuming each paper is read by two people, that strategic goal would be achievable by a team of twenty people working two hours per month on this task.




## Want to get involved?

<img width=200 align=right src="https://user-images.githubusercontent.com/29195/129488510-71dfabb1-6537-4a0a-9646-bd8ae26305c0.png">


 If that work interests you, then there are many ways you can get involved:

-  If you are a researcher then
   -  If wish to check that we have accurately recorded your contribution,
please visit please check our graph at https://reuse-dept.org.  
   - If you want to use this data to study the nature of science, please note that all the data iused in this site is
     freely and readily accessable (see **About this Data**, below)
- If you want to apply reuse graphs
to your community, please use the tools in this repo.
- If you are interested in joining this initiative and contributing to an up-to-minute snapshot of SE research, then please 
    - Take our [how-to-read-for-reuse tutorial](https://github.com/bhermann/DoR/blob/main/workflow/training.md);
    - Then visit our  [control dashboard](https://github.com/bhermann/DoR/projects/2) abd
find an issue with no one's face on it, and assign yourself a task.
- Better yet, if you are an educator teaching a graduate SE class, then get your students to do the following three week reading assignments,

 

## Using these tools for Graduate SE education

<img align=right width=300 src="https://user-images.githubusercontent.com/29195/129488128-597c203c-2ddb-48f9-a732-0ae9f07cf373.png">


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
 
 ## About this data
 
### Data Collection
 
This data was collected as follows:

- We targeted papers from the 2020 technical programs of six major international SE conferences: 
    - International Software Engineering (ICSE), 
    - Automated Software Engineering (ASE), 
    - Joint European Software Engineering Conference / Foundations of Software Engineering (ESEC/FSE), 
    - Software Maintenance and Engineering (ICSME), 
    - Mining Software Repositories (MSR), 
    - Empirical Software Engineering and Measurement (ESEM).     
    - These conferences were selected
using advice from [prior work](https://arxiv.org/pdf/1608.08100.pdf) but our vision is to expand; for example, by looking at all top-ranked SE conferences. 
- GitHub issues were used to divide up the hundreds of papers from those conferences into “work packets" of ten papers each. 
- Reading teams were set up from software engineering research teams from around the globe in Hong Kong, Istanbul (Turkey), Victoria (Canada), Gothenburg (Sweden), Oulu (Finland), Melbourne (Australia), and Raleigh (USA). 
- Team members would assign themselves work packets and then read the papers looking for the six kinds of reuse listed below:
  - _Stepping Stones_: Most papers have to benchmark their new ideas against some prior recent state-of-the-art paper. That is, they reuse old papers as stepping stones towards new results.
  - _Metrics and Method descriptions_ (which may be guidelines, with no tools);
  - _Data sets_
  -  _Sanity checks_ (justification for why a particular approach works or is reasonable to avoid bad data);
  - _Software packages_ of the kind currently being reviewed by SE conference artifact evaluation committees (tools and replications).
  - _Advanced Statistics_ Here we do not mean “we use a two-tailed t-test” or some other decades-old widely-used statistical method. Rather, we refer instead to statistical methods for recent papers that propose statistical guidance for the kinds of analysis seen in SE . Perhaps because this kind of analysis is very rare, these people are exceedingly high cited
  - Of course, there any [many other items being reused](https://pasteboard.co/Ke4tKgO.png) than these  six (and  it is an open question, worthy of future work, to check if those other items can be collected in this way).

- Once completed, a second person (from any of our teams) would do the same and check for consistency. 
- Fleiss Kappa statistics are then computed to track the level of reader disagreement. 
-  All interaction was done via the [GitHub issue system](https://github.com/bhermann/DoR/projects/2),

###  Using this data

 At the time of this writing (August 2021) it is our judgement that there is not enough data here, yet, to do things like (e.g.) topological studies on the nature of SE science. That said, at our current rate of data collection, we should be at that stage by end 2021.

With that caveat, we note that
 researchers can access all the data from this project at the following places:

- The primary source of data for the website is:
https://raw.githubusercontent.com/bhermann/DoR/main/department-of-reuse/src/assets/data/reuse.json 
- It is composed from all the CSV files in:
https://github.com/bhermann/DoR/tree/main/workflow/done
- The transformation process run as a build step is:
https://github.com/bhermann/DoR/blob/main/department-of-reuse/scripts/data-transformation.ts
- There is a separate script  used when checking new results to catch common mistakes:
https://github.com/bhermann/DoR/blob/main/department-of-reuse/scripts/check-reuse.ts

