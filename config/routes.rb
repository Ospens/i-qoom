Rails.application.routes.draw do
  # devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  controller :pages do
    root action: :index
  end

  get 'home', to: 'pages#home'

  namespace :api do
    namespace :v1 do
      resources :contacts, only: :create
      resources :sessions, only: :create
      resources :users, only: [:create, :update, :destroy]

      resources :documents, except: [:new, :create, :index] do
        member do
          post :create_revision
          get :download_native_file
        end
      end

      resources :document_folders, only: [:create, :edit, :update, :show] do
        collection do
          post :add_document_to_folders
        end
      end

      resources :projects, except: [:new, :edit] do
        resource :conventions, only: [:edit, :update]
        resources :documents, only: [:new, :create, :index] do
          collection do
            get :download_native_files
          end
        end
        resource :dms_settings, only: [:edit, :update]
        resource :document_rights, only: [:new, :edit, :update]
      end
    end
  end

  match '*path', to: 'pages#index', via: :all
end
