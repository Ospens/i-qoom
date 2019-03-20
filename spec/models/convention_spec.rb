require 'rails_helper'

RSpec.describe Convention, type: :model do
  context  'create_default_fields' do
    let(:convention) { FactoryBot.create(:convention) }

    it { expect(convention.document_fields.count).to eql(4) }
    it { expect(convention.document_fields.pluck(:codification_kind)).to\
      eq(['originating_company', 'discipline', 'document_type', 'document_number']) }
    it do
      convention2 = FactoryBot.create(:convention, number: 2)
      expect(convention2.document_fields.pluck(:codification_kind)).to\
        eq(['originating_company', 'receiving_company', 'discipline', 'document_type', 'document_number'])
    end
  end
end
