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
          post :send_reset_password_instructions
          get :reset_password
          patch :update_password
        end
      end

      resources :documents, except: [:new, :create, :index] do
        member do
          post :create_revision
          get :download_native_file
          get :download_details
          get :revisions
          get :revisions_and_versions
        end
        resources :document_review_subjects, only: [:new, :create]
      end

      resources :document_review_subjects, only: :show do
        resources :document_review_comments, only: [:new, :create]
        member do
          post :update_status
          post :complete_review
          get :download_files
        end
      end

      resources :document_review_comments, only: :update do
        get :download_file, on: :member
      end

      resource :document_review_owner, only: :update

      resources :document_revisions, only: [] do
        resources :document_review_subjects, only: :index
        post :update_review_status, on: :member
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
          get :dms_users
        end
        resource :conventions, only: [:edit, :update]
        resources :conventions, only: [] do
          member do
            get :download_codification
          end
        end
        resources :documents, only: [:new, :create, :index] do
          collection do
            get :download_native_files
            get :download_list
            get :my_documents
            resources :members, only: :show, module: :documents
          end
        end
        resource :dms_settings, only: [:edit, :update]
        resource :document_rights, only: [:new, :edit, :update]
        resources :dms_teams, only: [:create, :update, :show, :index] do
          member do
            post :update_members
            post :update_rights
          end
          get :index_for_documents, on: :collection
        end
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
        resources :document_review_owners, only: :index
        resources :document_revisions, only: [] do
          get :review_show, on: :member
          collection do
            get :review_menu
            get :review_index
          end
        end
        resources :document_review_tags, except: [:new, :edit, :show]
      end
      resources :messages, only: [:create, :show] do
        collection do
          get :inbox
          get :sent
        end
      end
    end
  end

  match '*path', to: "pages#index", via: :all, constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage'
  }

end
