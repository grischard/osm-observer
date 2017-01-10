import datetime

from osm_observer.extensions import db

__all__ = ['Review']


class Review(db.Model):
    __tablename__ = 'reviews'
    __table_args__ = {
        'schema': 'app'
    }

    id = db.Column(db.Integer, primary_key=True)
    score = db.Column(db.Integer, default=0)
    _status = db.Column(db.Integer, default=False)
    time_created = db.Column(
        db.DateTime,
        default=datetime.datetime.utcnow
    )
    changeset_id = db.Column(
        db.Integer,
        db.ForeignKey('app.changesets.id'),
        nullable=True
    )

    class STATUS(object):
        NOTHING = 0
        FIXED = 99

    _review_status = {
        0: 'Nothing',
        99: 'Fixed'
    }

    def __init__(self, changeset_id=None, score=0, status=STATUS.NOTHING):
        self.changeset_id = changeset_id
        self.score = score
        self.status = status

    @property
    def serialize(self):
        return {
            'id': self.id,
            'score': self.score,
            'status': self.status,
            'timeCreated': self.time_created.timestamp() * 1000
        }

    @property
    def status(self):
        return self._review_status[self._status]

    @status.setter
    def status(self, value):
        self._status = value

    @classmethod
    def by_id(cls, id):
        q = cls.query.filter(cls.id == id)
        return q.first()
