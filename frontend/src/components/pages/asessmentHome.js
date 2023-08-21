import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ViewOrCreateAssessment = () => {

  const cardStyle = {
    width: '400px',
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10px',
    margin: '20px',
    backgroundSize: 'cover',
    color: 'white',
    textAlign: 'center',
  };

  const createAssessmentCard = {
    ...cardStyle,
    backgroundImage: 'url("data:image/jpeg;base64,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")',
  };

  const viewAssessmentsCard = {
    ...cardStyle,
    backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwNdkAmfyUU0XLxiaT2Ec5dGSHvrS52LMe8w&usqp=CAU")',
  };

  return (
    <div style={{ background: '#5A5A5A', minHeight: '100vh', overflowX: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Link to="/newAssessment" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={createAssessmentCard}>
          <h2>Create an Assessment</h2>
        </div>
      </Link>
      <Link to="/viewPreviousAssessments" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={viewAssessmentsCard}>
          <h2>Assessment Records</h2>
        </div>
      </Link>
    </div>
  );
};

export default ViewOrCreateAssessment;
