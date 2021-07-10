# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
categories = Category.create([{name: "Food"}, {name: "To-Do"}, {name: "Movies"}])

candy_bars = List.create(title: "Favorite Candy Bars", category: categories.first)
candy_bar_items = Item.create([{name: "Hershey's", rank: 1, list: candy_bars}, {name: "Snickers", rank: 2, list: candy_bars}, {name: "Twix", rank: 3, list: candy_bars}, {name: "Milky Way", rank: 4, list: candy_bars}, {name: "Almond Joy", rank: 5, list: candy_bars}])

grill_food = List.create(title: "Foods To Cook On The Grill", category: categories.first)
grill_food_items = Item.create([{name: "Ribeye Steak", rank: 1, list: grill_food}, {name: "Baby Back Ribs", rank: 2, list: grill_food}, {name: "Bratwurst", rank: 3, list: grill_food}, {name: "Chicken Breast", rank: 4, list: grill_food}, {name: "Asparagus", rank: 5, list: grill_food}])

summer_cleaning = List.create(title: "Summer Cleaning Jobs", category: categories.second)
summer_cleaning_items = Item.create([{name: "Wash Windows", rank: 1, list: summer_cleaning}, {name: "Dust Shelves", rank: 2, list: summer_cleaning}, {name: "Organize Basement", rank: 3, list: summer_cleaning}, {name: "Clean Behind Appliances", rank: 4, list: summer_cleaning}, {name: "Scrub Floors", rank: 5, list: summer_cleaning}])

outside_projects = List.create(title: "Outside Projects", category: categories.second)
outside_projects_items = Item.create([{name: "Weed Garden", rank: 1, list: outside_projects}, {name: "Clean Gutters", rank: 2, list: outside_projects}, {name: "Fertilize Lawn", rank: 3, list: outside_projects}, {name: "Power Wash Fence", rank: 4, list: outside_projects}, {name: "Paint Fence", rank: 5, list: outside_projects}])

comedies = List.create(title: "Favorite Comedies", category: categories.third)
comedies_items = Item.create([{name: "The Blues Brothers", rank: 1, list: comedies}, {name: "The Big Lebowski", rank: 2, list: comedies}, {name: "Repo Man", rank: 3, list: comedies}, {name: "Kingpin", rank: 4, list: comedies}, {name: "Outside Providence", rank: 5, list: comedies}])

action = List.create(title: "Action Movies", category: categories.third)
action_items = Item.create([{name: "Die Hard", rank: 1, list: action}, {name: "Robocop", rank: 2, list: action}, {name: "Mad Max Fury Road", rank: 3, list: action}, {name: "Commando", rank: 4, list: action}, {name: "Terminator 2", rank: 5, list: action}])