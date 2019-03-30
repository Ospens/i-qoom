Rails.application.routes.draw do
  # devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  controller :pages do
    root action: :home
  end
  resources :contacts, only: :create
  resources :sessions, only: :create
  resources :users, only: [:create, :update, :destroy]
end
