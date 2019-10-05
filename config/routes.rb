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
      resources :users, only: [:create, :update, :destroy] do
        collection do
          get :confirm
        end
      end

      resources :documents, except: [:new, :create, :index] do
        member do
          post :create_revision
          get :download_native_file
          get :download_details
          get :revisions_and_versions
        end
      end

      resources :document_folders, only: [:create, :edit, :update, :show] do
        collection do
          post :add_document_to_folders
        end
      end

      resources :projects, except: [:new, :edit] do
        collection do
          get :confirm_admin
          get :confirm_member
        end
        member do
          post :invite
          post :update_project_code
        end
        resource :conventions, only: [:edit, :update]
        resources :documents, only: [:new, :create, :index] do
          collection do
            get :download_native_files
            get :download_list
            get :my_documents
          end
        end
        resource :dms_settings, only: [:edit, :update]
        resource :document_rights, only: [:new, :edit, :update]
        resources :project_administrators,
                  only: [ :show,
                          :index,
                          :destroy ],
                  path: :admins do
          member do
            get :resend_confirmation
          end
        end
        resources :project_members,
                  path: :members,
                  except: [ :index, :show ] do
          collection do
            get  :active
            get  :pending
          end
        end
        resources :disciplines,
                  except: [:new, :show]
        resources :roles,
                  except: [:new, :show]
        resources :document_folders, only: :index do
          get :user_index, on: :collection
        end
      end
      resources :messages, only: :create
    end
  end

  match '*path', to: "pages#index", via: :all, constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage'
  }

end
