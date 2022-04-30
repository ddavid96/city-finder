#!/bin/bash

awk -F '\t' '
    NR==1 { print "location.type\t"$1"\t"$2"\t"$3"\t"$4"\t""location.coordinates.0""\t""location.coordinates.1"}
    NR>1 { print "Point\t"$1"\t"$2"\t"$3"\t"$4"\t"$6"\t"$5}
' cities_canada-usa.tsv > /cities_canada-usa_parsed.tsv
mongoimport --host database --useArrayIndexFields --collection cities --drop --type=tsv --file /cities_canada-usa_parsed.tsv --headerline