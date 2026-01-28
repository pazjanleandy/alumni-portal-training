import React, { useState, useMemo } from 'react'
import { FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import ContinueCertificationCard from '../components/ContinueCertificationCard'
import CertificateCard from '../components/CertificateCard'

const CONTINUE_CERTIFICATIONS = [
  {
    id: 1,
    title: 'AWS Certified Solutions Architect',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop',
    instructor: {
      name: 'Lira',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    status: 'Live',
    progress: 3,
    totalLessons: 7,
  },
  {
    id: 2,
    title: 'AWS Certified Solutions Architect',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop',
    instructor: {
      name: 'John',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    status: 'Live',
    progress: 5,
    totalLessons: 7,
  },
  {
    id: 3,
    title: 'AWS Certified Solutions Architect',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop',
    instructor: {
      name: 'Sara',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    status: 'Live',
    progress: 1,
    totalLessons: 7,
  },
  {
    id: 4,
    title: 'AWS Certified Solutions Architect',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop',
    instructor: {
      name: 'Mike',
      avatar: 'https://i.pravatar.cc/150?img=4',
    },
    status: 'Live',
    progress: 4,
    totalLessons: 7,
  },
  {
    id: 5,
    title: 'AWS Certified Solutions Architect',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop',
    instructor: {
      name: 'Emma',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    status: 'Live',
    progress: 2,
    totalLessons: 7,
  },
  {
    id: 6,
    title: 'AWS Certified Solutions Architect',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop',
    instructor: {
      name: 'David',
      avatar: 'https://i.pravatar.cc/150?img=6',
    },
    status: 'Live',
    progress: 6,
    totalLessons: 7,
  },
]

const MY_CERTIFICATES = [
  {
    id: 1,
    name: 'Cloud Architect',
    title: 'AWS Certified Solutions Architect',
    holderName: 'Enter Name Here',
    issuer: 'Amazon Web Services',
    issueDate: 'Jul 2023',
    expiryDate: 'Present',
    description: 'Lorem ipsum dolor sit amet of cloud computing and architecture fundamentals with AWS certification.',
  },
  {
    id: 2,
    name: 'DevOps Engineer',
    title: 'AWS Certified DevOps Engineer',
    holderName: 'Enter Name Here',
    issuer: 'Amazon Web Services',
    issueDate: 'Aug 2023',
    expiryDate: 'Present',
    description: 'Lorem ipsum dolor sit amet of deployment and operations on AWS infrastructure with hands-on experience.',
  },
  {
    id: 3,
    name: 'Data Engineer',
    title: 'AWS Certified Data Engineer',
    holderName: 'Enter Name Here',
    issuer: 'Amazon Web Services',
    issueDate: 'Sep 2023',
    expiryDate: 'Present',
    description: 'Lorem ipsum dolor sit amet of data pipeline development and analytics with AWS specialized tools.',
  },
  {
    id: 4,
    name: 'Cloud Architect',
    title: 'AWS Certified Solutions Architect',
    holderName: 'Enter Name Here',
    issuer: 'Amazon Web Services',
    issueDate: 'Jul 2022',
    expiryDate: 'Present',
    description: 'Lorem ipsum dolor sit amet of cloud architecture design patterns and best practices with AWS.',
  },
  {
    id: 5,
    name: 'Security Engineer',
    title: 'AWS Certified Security Specialist',
    holderName: 'Enter Name Here',
    issuer: 'Amazon Web Services',
    issueDate: 'Jun 2023',
    expiryDate: 'Present',
    description: 'Lorem ipsum dolor sit amet of security principles and implementation on the AWS platform.',
  },
  {
    id: 6,
    name: 'Solutions Architect',
    title: 'AWS Certified Solutions Architect',
    holderName: 'Enter Name Here',
    issuer: 'Amazon Web Services',
    issueDate: 'May 2023',
    expiryDate: 'Present',
    description: 'Lorem ipsum dolor sit amet of designing distributed systems and scalable architectures on AWS.',
  },
]

export default function CertificationsPage() {
  const [certificateTab, setCertificateTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const filteredCertificates = useMemo(() => {
    let filtered = MY_CERTIFICATES

    if (searchQuery) {
      filtered = filtered.filter(
        (cert) =>
          cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cert.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return filtered
  }, [searchQuery])

  const totalPages = Math.ceil(filteredCertificates.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedCertificates = filteredCertificates.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  return (
    <div className="space-y-6">

      {/* Continue Certification Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Continue Certification</h2>
          <a href="#" className="text-yellow-500 hover:text-yellow-600 text-sm font-semibold">
            View History
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONTINUE_CERTIFICATIONS.map((cert) => (
            <ContinueCertificationCard key={cert.id} certification={cert} />
          ))}
        </div>
      </section>

      {/* My Certificates Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">My Certificates</h2>

        <div className="flex flex-col gap-6 mb-6">
          {/* Search Bar */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-4 border-b border-gray-200">
            <button
              onClick={() => setCertificateTab('all')}
              className={`py-2 px-1 text-sm font-medium transition-colors ${
                certificateTab === 'all'
                  ? 'text-yellow-500 border-b-2 border-yellow-500'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 text-sm font-bold">
                  📋
                </span>
                All Certificates
              </span>
            </button>
            <button
              onClick={() => setCertificateTab('upload')}
              className={`py-2 px-1 text-sm font-medium transition-colors ${
                certificateTab === 'upload'
                  ? 'text-yellow-500 border-b-2 border-yellow-500'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 text-sm font-bold">
                  ⬆️
                </span>
                Upload New Certificate
              </span>
            </button>
          </div>
        </div>

        {/* Certificate Status */}
        <div className="text-sm text-gray-600 mb-6">
          Showing {startIndex + 1} out of {filteredCertificates.length}
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {paginatedCertificates.map((cert) => (
            <CertificateCard key={cert.id} certificate={cert} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 text-gray-600 disabled:opacity-50 hover:bg-gray-50"
            >
              <FiChevronLeft size={20} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-yellow-500 text-white'
                    : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 text-gray-600 disabled:opacity-50 hover:bg-gray-50"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        )}
      </section>
    </div>
  )
}
