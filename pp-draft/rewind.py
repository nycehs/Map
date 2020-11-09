import topojson as tp
import geopandas as gpd
gdf = gpd.read_file('/Users/grantpezeshki/Documents/GitHub/Map/pp copy/MODZCTA_2010_RI99999_WGS1984_update.json')
tp.Topology(gdf).to_json('/Users/grantpezeshki/Documents/GitHub/Map/pp copy/MODZCTA_2010_RI99999_WGS1984_update_new.json')