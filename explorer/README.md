# nyc covid-19 zip code explorer
A few notes 
- Accessible autocomplete from gov.uk
- Event listener listens for submission, takes the target event, and puts it into a variable
- JS interprets parent borough from the selected ZIP code
- d3.csv code and .then() turns csvs into objects
- lots of calculating and dumping stuff all over the place

Other ideas
- Incorporating ACS data into a neighborhood profile: in addition to population, adding poverty, % of people over age XX, and race/eth distribution
- Converting the "your zip / median" range chart section to sentences, or pulling those range charts out of a table (though the table is useful for formatting)

And one missing piece:
- getting "selection" to work on the Vega-Lite maps - might need Vega maps instead?
