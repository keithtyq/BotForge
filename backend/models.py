from backend import db
from datetime import datetime

class Organisation(db.Model):
    __tablename__ = "organisation"

    organisation_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    industry = db.Column(db.String(50))
    size = db.Column(db.String(20))
    subscription_id = db.Column(db.Integer, db.ForeignKey("subscription.subscription_id"))


class AppUser(db.Model):
    __tablename__ = "app_user"

    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)   # store HASH
    email = db.Column(db.String(100), nullable=False, unique=True)
    status = db.Column(db.Boolean, default=False)          # false = not verified
    role_id = db.Column(db.Integer, db.ForeignKey("role.role_id"), nullable=False)
    organisation_id = db.Column(db.Integer, db.ForeignKey("organisation.organisation_id"))


class Role(db.Model):
    __tablename__ = "role"

    role_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)


class Subscription(db.Model):
    __tablename__ = "subscription"

    subscription_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    description = db.Column(db.String(255))


class Invitation(db.Model):
    __tablename__ = "invitation"

    invitation_id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), nullable=False)
    organisation_id = db.Column(db.Integer, db.ForeignKey("organisation.organisation_id"), nullable=False)
    invited_by_user_id = db.Column(db.Integer, db.ForeignKey("app_user.user_id"), nullable=False)
    token = db.Column(db.String(255), nullable=False, unique=True)
    status = db.Column(db.SmallInteger, nullable=False, default=0)  # 0=pending, 1=accepted, 2=revoked
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

class Feedback(db.Model):
    __tablename__ = "feedback"

    feedback_id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey("app_user.user_id"), nullable=False)
    title = db.Column(db.String(100))
    rating = db.Column(db.Integer)
    content = db.Column(db.Text)
    creation_date = db.Column(db.DateTime, nullable=False)
    is_testimonial = db.Column(db.Boolean, nullable=False, default=False)