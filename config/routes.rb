Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  controller :pages do
    root action: :home
  end
  namespace :api do
    namespace :v1 do
      resources :contacts, only: [:create]
    end
  end
end
