import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Test from './components/Test';
import Leaderboard from './components/Leaderboard';
import QuestionValidation from './components/QuestionValidation';
import TeacherReview from './components/TeacherReview';
import AdminOversight from './components/AdminOversight';
import StudentReport from './components/StudentReport';
import PerformanceTracking from './components/PerformanceTracking';
import MockTestManagement from './components/MockTestManagement';
import ExamManagement from './components/ExamManagement';
import QuestionBank from './components/QuestionBank';
import QuestionSubmission from './components/QuestionSubmission';
import QuestionReview from './components/QuestionReview';
import QuestionApproval from './components/QuestionApproval';
import QuestionRejection from './components/QuestionRejection';
import QuestionCorrection from './components/QuestionCorrection';
import QuestionDeployment from './components/QuestionDeployment';
import QuestionReporting from './components/QuestionReporting';
import QuestionReviewCorrection from './components/QuestionReviewCorrection';
import QuestionLiveDeployment from './components/QuestionLiveDeployment';
import QuestionFlagging from './components/QuestionFlagging';
import QuestionReviewUpdate from './components/QuestionReviewUpdate';
import QuestionReviewApproval from './components/QuestionReviewApproval';
import QuestionReviewRejection from './components/QuestionReviewRejection';
import QuestionReviewCorrectionUpdate from './components/QuestionReviewCorrectionUpdate';
import QuestionReviewLiveDeployment from './components/QuestionReviewLiveDeployment';
import QuestionReviewFlagging from './components/QuestionReviewFlagging';
import QuestionReviewUpdateApproval from './components/QuestionReviewUpdateApproval';
import QuestionReviewUpdateRejection from './components/QuestionReviewUpdateRejection';
import QuestionReviewUpdateCorrection from './components/QuestionReviewUpdateCorrection';
import QuestionReviewUpdateLiveDeployment from './components/QuestionReviewUpdateLiveDeployment';
import QuestionReviewUpdateFlagging from './components/QuestionReviewUpdateFlagging';
import QuestionReviewUpdateApprovalCorrection from './components/QuestionReviewUpdateApprovalCorrection';
import QuestionReviewUpdateApprovalLiveDeployment from './components/QuestionReviewUpdateApprovalLiveDeployment';
import QuestionReviewUpdateApprovalFlagging from './components/QuestionReviewUpdateApprovalFlagging';
import QuestionReviewUpdateRejectionCorrection from './components/QuestionReviewUpdateRejectionCorrection';
import QuestionReviewUpdateRejectionLiveDeployment from './components/QuestionReviewUpdateRejectionLiveDeployment';
import QuestionReviewUpdateRejectionFlagging from './components/QuestionReviewUpdateRejectionFlagging';
import QuestionReviewUpdateCorrectionApproval from './components/QuestionReviewUpdateCorrectionApproval';
import QuestionReviewUpdateCorrectionLiveDeployment from './components/QuestionReviewUpdateCorrectionLiveDeployment';
import QuestionReviewUpdateCorrectionFlagging from './components/QuestionReviewUpdateCorrectionFlagging';
import QuestionReviewUpdateLiveDeploymentApproval from './components/QuestionReviewUpdateLiveDeploymentApproval';
import QuestionReviewUpdateLiveDeploymentRejection from './components/QuestionReviewUpdateLiveDeploymentRejection';
import QuestionReviewUpdateLiveDeploymentCorrection from './components/QuestionReviewUpdateLiveDeploymentCorrection';
import QuestionReviewUpdateLiveDeploymentFlagging from './components/QuestionReviewUpdateLiveDeploymentFlagging';
import QuestionReviewUpdateFlaggingApproval from './components/QuestionReviewUpdateFlaggingApproval';
import QuestionReviewUpdateFlaggingRejection from './components/QuestionReviewUpdateFlaggingRejection';
import QuestionReviewUpdateFlaggingCorrection from './components/QuestionReviewUpdateFlaggingCorrection';
import QuestionReviewUpdateFlaggingLiveDeployment from './components/QuestionReviewUpdateFlaggingLiveDeployment';
import QuestionReviewUpdateApprovalCorrectionLiveDeployment from './components/QuestionReviewUpdateApprovalCorrectionLiveDeployment';
import QuestionReviewUpdateApprovalCorrectionFlagging from './components/QuestionReviewUpdateApprovalCorrectionFlagging';
import QuestionReviewUpdateApprovalLiveDeploymentFlagging from './components/QuestionReviewUpdateApprovalLiveDeploymentFlagging';
import QuestionReviewUpdateRejectionCorrectionApproval from './components/QuestionReviewUpdateRejectionCorrectionApproval';
import QuestionReviewUpdateRejectionCorrectionLiveDeployment from './components/QuestionReviewUpdateRejectionCorrectionLiveDeployment';
import QuestionReviewUpdateRejectionCorrectionFlagging from './components/QuestionReviewUpdateRejectionCorrectionFlagging';
import QuestionReviewUpdateRejectionLiveDeploymentApprovalCorrection from './components/QuestionReviewUpdateRejectionLiveDeploymentApprovalCorrection';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/test" component={Test} />
          <Route path="/leaderboard" component={Leaderboard} />
          <Route path="/question-validation" component={QuestionValidation} />
          <Route path="/teacher-review" component={TeacherReview} />
          <Route path="/admin-oversight" component={AdminOversight} />
          <Route path="/student-report" component={StudentReport} />
          <Route path="/performance-tracking" component={PerformanceTracking} />
          <Route path="/mock-test-management" component={MockTestManagement} />
          <Route path="/exam-management" component={ExamManagement} />
          <Route path="/question-bank" component={QuestionBank} />
          <Route path="/question-submission" component={QuestionSubmission} />
          <Route path="/question-review" component={QuestionReview} />
          <Route path="/question-approval" component={QuestionApproval} />
          <Route path="/question-rejection" component={QuestionRejection} />
          <Route path="/question-correction" component={QuestionCorrection} />
          <Route path="/question-deployment" component={QuestionDeployment} />
          <Route path="/question-reporting" component={QuestionReporting} />
          <Route path="/question-review-correction" component={QuestionReviewCorrection} />
          <Route path="/question-live-deployment" component={QuestionLiveDeployment} />
          <Route path="/question-flagging" component={QuestionFlagging} />
          <Route path="/question-review-update" component={QuestionReviewUpdate} />
          <Route path="/question-review-approval" component={QuestionReviewApproval} />
          <Route path="/question-review-rejection" component={QuestionReviewRejection} />
          <Route path="/question-review-correction-update" component={QuestionReviewCorrectionUpdate} />
          <Route path="/question-review-live-deployment" component={QuestionReviewLiveDeployment} />
          <Route path="/question-review-flagging" component={QuestionReviewFlagging} />
          <Route path="/question-review-update-approval" component={QuestionReviewUpdateApproval} />
          <Route path="/question-review-update-rejection" component={QuestionReviewUpdateRejection} />
          <Route path="/question-review-update-correction" component={QuestionReviewUpdateCorrection} />
          <Route path="/question-review-update-live-deployment" component={QuestionReviewUpdateLiveDeployment} />
          <Route path="/question-review-update-flagging" component={QuestionReviewUpdateFlagging} />
          <Route path="/question-review-update-approval-correction" component={QuestionReviewUpdateApprovalCorrection} />
          <Route path="/question-review-update-approval-live-deployment" component={QuestionReviewUpdateApprovalLiveDeployment} />
          <Route path="/question-review-update-approval-flagging" component={QuestionReviewUpdateApprovalFlagging} />
          <Route path="/question-review-update-rejection-correction" component={QuestionReviewUpdateRejectionCorrection} />
          <Route path="/question-review-update-rejection-live-deployment" component={QuestionReviewUpdateRejectionLiveDeployment} />
          <Route path="/question-review-update-rejection-flagging" component={QuestionReviewUpdateRejectionFlagging} />
          <Route path="/question-review-update-correction-approval" component={QuestionReviewUpdateCorrectionApproval} />
          <Route path="/question-review-update-correction-live-deployment" component={QuestionReviewUpdateCorrectionLiveDeployment} />
          <Route path="/question-review-update-correction-flagging" component={QuestionReviewUpdateCorrectionFlagging} />
          <Route path="/question-review-update-live-deployment-approval" component={QuestionReviewUpdateLiveDeploymentApproval} />
          <Route path="/question-review-update-live-deployment-rejection" component={QuestionReviewUpdateLiveDeploymentRejection} />
          <Route path="/question-review-update-live-deployment-correction" component={QuestionReviewUpdateLiveDeploymentCorrection} />
          <Route path="/question-review-update-live-deployment-flagging" component={QuestionReviewUpdateLiveDeploymentFlagging} />
          <Route path="/question-review-update-flagging-approval" component={QuestionReviewUpdateFlaggingApproval} />
          <Route path="/question-review-update-flagging-rejection" component={QuestionReviewUpdateFlaggingRejection} />
          <Route path="/question-review-update-flagging-correction" component={QuestionReviewUpdateFlaggingCorrection} />
          <Route path="/question-review-update-flagging-live-deployment" component={QuestionReviewUpdateFlaggingLiveDeployment} />
          <Route path="/question-review-update-approval-correction-live-deployment" component={QuestionReviewUpdateApprovalCorrectionLiveDeployment} />
          <Route path="/question-review-update-approval-correction-flagging" component={QuestionReviewUpdateApprovalCorrectionFlagging} />
          <Route path="/question-review-update-approval-live-deployment-flagging" component={QuestionReviewUpdateApprovalLiveDeploymentFlagging} />
          <Route path="/question-review-update-rejection-correction-approval" component={QuestionReviewUpdateRejectionCorrectionApproval} />
          <Route path="/question-review-update-rejection-correction-live-deployment" component={QuestionReviewUpdateRejectionCorrectionLiveDeployment} />
          <Route path="/question-review-update-rejection-correction-flagging" component={QuestionReviewUpdateRejectionCorrectionFlagging} />
          <Route path="/question-review-update-rejection-live-deployment-approval-correction" component={QuestionReviewUpdateRejectionLiveDeploymentApprovalCorrection} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
