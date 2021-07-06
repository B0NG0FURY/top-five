# Top Five

Top Five is an application that uses a Rails API backend with a Javascript frontend to allow the user to make ranked lists that catalogue, reference, and prioritize the things in their life. 

## Installation

Fork and clone this repo.

Move to the 'top-five-backend' directory. Run 'bundle install'. Connect to PostgreSQL and run 'rake db:setup' to create database and initialize it with seed data.

## Usage

Upon the page loading the user can choose whether to view lists by category or create a new list. Clicking on "Create New List" will bring up the form for a new list where the user can select an existing category for the list or create a whole new one, add a title for the list and the items in the order they would like them ranked. New lists MUST HAVE a category and a title in order to be saved. An error will appear above the form if this criteria is not met to inform the user. The ranks of items in lists can be changed with the arrow buttons and titles and items can be changed by clicking the edit button and making the desired changes. 

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT]((https://choosealicense.com/licenses/mit/)