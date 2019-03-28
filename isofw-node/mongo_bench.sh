echo Doing Full Patch
time node mongo_bench.js fullSet
echo Doing Partial Patch
time node mongo_bench.js patchNr
echo Doing Partial Patch Program
time node mongo_bench.js patchProgram
echo Doing Partial Patch Program second
time node mongo_bench.js patchProgram

