import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import avatar from '../../../../../images/tmp_avatar.jpg'
import DMSLayout from '../../DMSLayout'
import DmsSideBar from '../../sideBar/DmsSideBar'
import { showMemberProfile } from '../../../../../actions/accessRightsActions'
import countries from '../../../../landing/countriesCodes'
import DistributionGroup from './DistributionGroup'
import Teams from './Teams'

function BasicInfo({
  countryCode, state, city, zipCode
}) {
  const country = countries.find(c => c.value === countryCode) || {}

  return (
    <div className="user-profile__info-container first">
      <div className="user-profile__info-container_title">Basic information</div>
      <div className="user-profile__user-base-info">
        <div className="user-profile__user_block">
          <div className="user-profile__user_block-title">
            Address
          </div>
          <div className="user-profile__user-contact-info_block-content">
            {country.title}, {state}
          </div>
        </div>
        <div className="user-profile__user_block">
          <div className="user-profile__user_block-title">
            City
          </div>
          <div className="user-profile__user-contact-info_block-content">
            {city}
          </div>
        </div>
        <div className="user-profile__user_block">
          <div className="user-profile__user_block-title">
            ZIP-Code
          </div>
          <div className="user-profile__user-contact-info_block-content">
            {zipCode || '---'}
          </div>
        </div>
      </div>
    </div>
  )
}

function Bio() {
  return (
    <div className="user-profile__info-container">
      <div className="user-profile__info-container_title">Bio</div>
      <div className="user-profile__user_block">
        Donec rutrum congue leo eget malesuada. Quisque velit nisi, pretium ut lacinia in,
        elementum id enim. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Vivamus
        magna justo, lacinia eget consectetur sed, convallis at tellus. Donec rutrum congue
        leo eget malesuada.
      </div>
    </div>
  )
}

const arElement = el => <div key={el}>{el}</div>

function AccessRights({ rights = {} }) {
  const originatingCompanies = rights.originating_company || []
  const disciplines = rights.discipline || []
  const documentTypes = rights.document_type || []

  return (
    <div className="user-profile__info-container">
      <div className="user-profile__info-container_title d-flex">
        <div>Access rights</div>
        <div className="green ml-5">Access limit: 12.10.2021</div>
        <div className="ml-auto">
          <button type="button" className="with-icon">
            <span>Edit</span>
          </button>
        </div>
      </div>
      <div className="user-profile__user-base-info">
        <div className="user-profile__user_block">
          <div className="user-profile__user_block-title">
            Originating Company
          </div>
          <div className="user-profile__user-contact-info_block-content">
            {originatingCompanies.map(el => arElement(el))}
          </div>
        </div>
        <div className="user-profile__user_block">
          <div className="user-profile__user_block-title">
            Discipline
          </div>
          <div className="user-profile__user-contact-info_block-content">
            {disciplines.map(el => arElement(el))}
          </div>
        </div>
        <div className="user-profile__user_block">
          <div className="user-profile__user_block-title">
            Document type
          </div>
          <div className="user-profile__user-contact-info_block-content">
            {documentTypes.map(el => arElement(el))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Content() {
  const member = useSelector(state => state.accessRights.currentMember)

  return (
    <div className="user-profile">

      <div className="user-profile__first-column">
        <h4>Member profile</h4>
        <div className="user-profile__avatar-block">
          <img className="image-avatar" src={avatar} alt="" />
        </div>
        <div className="user-profile__first-names">{`${member.first_name} ${member.last_name}`}</div>
        <div className="user-profile__user-work-description">
          <div className="user-profile__user-work-position">Facility Manager</div>
          <div className="user-profile__user-work-office">Lufthansa Technik, Hamburg (GER)</div>
        </div>
        <div className="user-profile__info-container">
          <div className="user-profile__info-container_title">Contact information</div>

          <div className="user-profile__user_block">
            <div className="user-profile__user_block-title">
              Email
            </div>
            <div className="user-profile__user-contact-info_block-content">
              <a href="#">{`${member.email}`}</a>
            </div>
          </div>

          <div className="user-profile__user_block">
            <div className="user-profile__user_block-title">
              i-Qoom-ID
            </div>
            <div className="user-profile__user_block-content">
              <a href="#">{`${member.username}`}</a>
            </div>
          </div>

          <div className="user-profile__user_block">
            <div className="user-profile__user_block-title">
              Phone
            </div>
            <div className="user-profile__user_block-content">
              <span>{member.phone || '---'}</span>
            </div>
          </div>

        </div>
      </div>

      <div className="user-profile__second-column">
        <BasicInfo
          countryCode={member.country}
          state={member.state}
          city={member.city}
          zipCode={member.zip_code}
        />
        <Bio />
        <AccessRights rights={member.rights} />
        <Teams teams={member.teams} />
        {/* <DistributionGroup groups={member.teams} /> */}
      </div>
    </div>
  )
}

function Index() {
  const dispatch = useDispatch()
  const { projectId, memberId } = useParams()
  useEffect(() => {
    dispatch(showMemberProfile(projectId, memberId))
  }, [dispatch])

  const sidebar = <DmsSideBar />
  const content = <Content />
  return (
    <DMSLayout
      sidebar={sidebar}
      content={content}
    />
  )
}

export default Index
