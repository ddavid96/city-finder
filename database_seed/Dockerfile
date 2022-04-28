FROM mongo

COPY cities_canada-usa.tsv /cities_canada-usa.tsv
CMD mongoimport --host database --collection cities --type=tsv --file /cities_canada-usa.tsv --fields "id","name","lat","long"