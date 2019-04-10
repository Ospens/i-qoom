Rails.application.routes.draw do
  # devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  controller :pages do
    root action: :home
  end
  namespace :api do
    namespace :v1 do
      resources :contacts, only: :create
      resources :sessions, only: :create
      resources :users, only: [:create, :update, :destroy]

      resources :conventions, only: [:edit, :update]
      resources :documents, except: [:new, :create, :index]

      resources :projects, except: [:new, :edit] do
        resources :documents, only: [:new, :create, :index]
      end
    end
  end
end
