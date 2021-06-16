Rails.application.routes.draw do
  resources :items
  resources :lists
  resources :categories, only: [:index, :create] do
    resources :lists, only: [:index]
  end
  post '/items/swap', to: 'items#swap'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
