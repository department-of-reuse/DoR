# Before you start... do the Training

Before doing real work with the [coding_guide](coding_guide.md), please do the training.

## Read background notes on artifacts

- [Ben Hermann et al.'s FSE paper on artifacts](https://dl.acm.org/doi/10.1145/3368089.3409767)
- [CMU's  paper on artifacts](https://arxiv.org/pdf/2008.01046.pdf])

## Check that you can find Reuse

Reuse is not a clear cut yes,no. It is a continuum. Somethings are used all the time (e.g. standard statistical methods) and if we declared those to  be "reused" then that could overwhelm our records.

So you need to learn to calibrate when you decide something is reused or not.

To do that, you need to do a training exercise:
- [ ] Read 4 papers that have been analyzed before:
	- [ ] Dimensions of software configuration - on the configuration context in modern software development, Norbert Siegmund, Nicolai Ruckel, Janet Siegmund, https://doi.org/10.1145/3368089.3409675
	- [ ] Cost measures matter for mutation testing study validity. Giovani Guizzo, Federica Sarro, Mark Harman, https://doi.org/10.1145/3368089.3409742
	- [ ] On the relationship between refactoring actions and bugs - a differentiated replication. Massimiliano Di Penta, Gabriele Bavota, Fiorella Zampetti. https://doi.org/10.1145/3368089.3409695
	- [ ] Questions for data scientists in software engineering - a replication. Hennie Huijgens, Ayushi Rastogi, Ernst Mulders, Georgios Gousios, Arie van Deursen. https://doi.org/10.1145/3368089.3409717
- [ ] Then, and only then, [look at the results:](results-sample.csv). DO NOT LOOK at these until you get your own results.
	  - Hint:
     - Paper1 will take about an hour to skim to look for reused parts
     - after that, you will speed up and it should about 15-20 minutes to skims paper2,3,4,
- [ ] Check that you are getting the same results.

Once you are calibrated, then proceed.
