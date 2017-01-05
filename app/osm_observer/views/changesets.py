from flask import abort, jsonify, request

from flask_login import login_required, current_user

from osm_observer.views import api
from osm_observer.lib.changes import query_changesets, query_changeset_details
from osm_observer.model import Coverage

@api.route('/changesets')
@login_required
def changesets_list():
    # TODO add more filter options
    coverage_id = request.args.get('coverage', False)
    if coverage_id:
        coverage = Coverage.by_id(coverage_id)
        if coverage not in current_user.coverages:
            raise abort(403)
        changesets=list(query_changesets(coverages=coverage))
    else:
        changesets=list(query_changesets(current_user.coverages))

    return jsonify(serialize_changests(changesets))


@api.route('/changesets/details/<int:changeset_id>/details')
def changeset_details(changeset_id):
    details = query_changeset_details(changeset_id)
    return jsonify(serialize_changest_details(details))

def serialize_changest_details(changeset):
    return {
        'osmId': changeset['id'],
        'createdAt': changeset['created_at'],
        'closedAt': changeset['closed_at'],
        'nodesAdd': changeset['nodes_add'],
        'nodesModify': changeset['nodes_modify'],
        'nodesDelete': changeset['nodes_delete'],
        'waysAdd': changeset['ways_add'],
        'waysModify': changeset['ways_modify'],
        'waysDelete': changeset['ways_delete'],
        'relationsAdd': changeset['relations_add'],
        'relationsModify': changeset['relations_modify'],
        'relationsDelete': changeset['relations_delete'],
    }

def serialize_changests(changesets):
    data = []
    for changeset in changesets:
        data.append({
            'osmId': changeset.id,
            'createdAt': changeset.created_at,
            'closedAt': changeset.closed_at,
            'username': changeset.user_name,
            'numChanges': changeset.num_changes,
            'userId': changeset.user_id,
            'tags': changeset.tags
        })
    return data