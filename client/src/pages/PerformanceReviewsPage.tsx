import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Spinner, Alert, Badge, ProgressBar } from 'react-bootstrap';
import { PerformanceReview, ReviewStatus } from '../types';
import './PerformanceReviewsPage.scss';

const PerformanceReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<PerformanceReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  useEffect(() => {
    fetchPerformanceReviews();
  }, [statusFilter]);

  const fetchPerformanceReviews = async () => {
    try {
      setIsLoading(true);
      // Mock data for now - in real app, this would come from API
      const mockReviews: PerformanceReview[] = [
        {
          id: '1',
          employeeId: 'emp1',
          reviewerId: 'mgr1',
          reviewPeriod: 'Q4 2023',
          overallRating: 4,
          goals: [
            {
              id: '1',
              title: 'Complete project delivery',
              description: 'Deliver the new feature on time',
              targetDate: '2023-12-31',
              status: 'completed' as any,
              progress: 100,
            },
            {
              id: '2',
              title: 'Improve team collaboration',
              description: 'Lead weekly team meetings',
              targetDate: '2023-12-15',
              status: 'completed' as any,
              progress: 100,
            },
          ],
          achievements: [
            'Successfully delivered the new feature ahead of schedule',
            'Improved team productivity by 20%',
            'Mentored 2 junior developers',
          ],
          areasForImprovement: [
            'Better documentation practices',
            'More proactive communication',
          ],
          comments: 'Excellent performance this quarter. Keep up the great work!',
          status: ReviewStatus.COMPLETED,
          createdAt: '2023-12-01T10:00:00Z',
          updatedAt: '2023-12-15T14:00:00Z',
        },
        {
          id: '2',
          employeeId: 'emp2',
          reviewerId: 'mgr1',
          reviewPeriod: 'Q4 2023',
          overallRating: 3,
          goals: [
            {
              id: '3',
              title: 'Learn new technology',
              description: 'Complete React certification',
              targetDate: '2024-01-31',
              status: 'in_progress' as any,
              progress: 60,
            },
          ],
          achievements: [
            'Completed 3 major bug fixes',
            'Improved code quality metrics',
          ],
          areasForImprovement: [
            'Time management',
            'Technical documentation',
          ],
          comments: 'Good progress, but needs to focus on time management.',
          status: ReviewStatus.IN_PROGRESS,
          createdAt: '2023-12-01T10:00:00Z',
          updatedAt: '2023-12-10T14:00:00Z',
        },
      ];
      setReviews(mockReviews);
    } catch (err: any) {
      setError('Failed to load performance reviews');
      console.error('Performance reviews error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: ReviewStatus) => {
    const variants = {
      [ReviewStatus.DRAFT]: 'secondary',
      [ReviewStatus.IN_PROGRESS]: 'warning',
      [ReviewStatus.COMPLETED]: 'info',
      [ReviewStatus.APPROVED]: 'success',
    };
    return <Badge bg={variants[status]}>{status.replace('_', ' ')}</Badge>;
  };

  const getRatingStars = (rating: number) => {
    return (
      <div className="rating">
        {[...Array(5)].map((_, i) => (
          <i
            key={i}
            className={`bi bi-star${i < rating ? '-fill' : ''} text-warning`}
          ></i>
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <Container className="py-4">
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h3 mb-0">Performance Reviews</h1>
              <p className="text-muted">Manage employee performance reviews</p>
            </div>
            <Button variant="primary">
              <i className="bi bi-plus-lg me-2"></i>
              New Review
            </Button>
          </div>
        </Col>
      </Row>

      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}

      {/* Filters */}
      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={3}>
              <Form.Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Status</option>
                <option value={ReviewStatus.DRAFT}>Draft</option>
                <option value={ReviewStatus.IN_PROGRESS}>In Progress</option>
                <option value={ReviewStatus.COMPLETED}>Completed</option>
                <option value={ReviewStatus.APPROVED}>Approved</option>
              </Form.Select>
            </Col>
            <Col md={2}>
              <Button
                variant="outline-secondary"
                onClick={() => setStatusFilter('')}
                className="w-100"
              >
                Clear
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Performance Reviews */}
      <Row>
        {reviews.map((review) => (
          <Col md={6} key={review.id} className="mb-4">
            <Card className="h-100">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-0">{review.reviewPeriod}</h6>
                  <small className="text-muted">John Doe</small>
                </div>
                {getStatusBadge(review.status)}
              </Card.Header>
              <Card.Body>
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span>Overall Rating:</span>
                    {getRatingStars(review.overallRating)}
                  </div>
                </div>

                <div className="mb-3">
                  <h6>Goals Progress</h6>
                  {review.goals.map((goal) => (
                    <div key={goal.id} className="mb-2">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="small">{goal.title}</span>
                        <span className="small text-muted">{goal.progress}%</span>
                      </div>
                      <ProgressBar
                        now={goal.progress}
                        variant={goal.progress === 100 ? 'success' : goal.progress > 50 ? 'info' : 'warning'}
                      />
                    </div>
                  ))}
                </div>

                <div className="mb-3">
                  <h6>Achievements</h6>
                  <ul className="small mb-0">
                    {review.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-3">
                  <h6>Areas for Improvement</h6>
                  <ul className="small mb-0">
                    {review.areasForImprovement.map((area, index) => (
                      <li key={index}>{area}</li>
                    ))}
                  </ul>
                </div>

                {review.comments && (
                  <div className="mb-3">
                    <h6>Comments</h6>
                    <p className="small mb-0">{review.comments}</p>
                  </div>
                )}

                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">
                    Updated: {formatDate(review.updatedAt)}
                  </small>
                  <div>
                    <Button variant="outline-primary" size="sm" className="me-2">
                      View
                    </Button>
                    {review.status === ReviewStatus.DRAFT && (
                      <Button variant="primary" size="sm">
                        Edit
                      </Button>
                    )}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {reviews.length === 0 && !isLoading && (
        <Card>
          <Card.Body className="text-center py-5">
            <i className="bi bi-clipboard-check text-muted" style={{ fontSize: '3rem' }}></i>
            <h5 className="mt-3">No performance reviews found</h5>
            <p className="text-muted">Try adjusting your search criteria or create a new review.</p>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default PerformanceReviewsPage;
