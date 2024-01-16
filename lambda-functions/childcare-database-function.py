import json
import mysql.connector


def sanitize_input(param_value, accepted_values):
    if param_value not in accepted_values:
        raise Exception("Invalid input")
    return param_value


def lambda_handler(event, context):
    # TODO implement
    
    print("event string:")
    print(event)
    
    params = event['queryStringParameters']
    print(params['table'])

    cnx = mysql.connector.connect(user='CPSC304', password='Cpsc#304project',
                                  host='childcare-database.cwsbzrg5sjrx.us-west-2.rds.amazonaws.com',
                                  database='childcare_db')
                                  
    cursor = cnx.cursor(dictionary=True)
    
    table_param = params['table']
    query = ("")  # Init
    values = ()  # Init
    
    if table_param == 'child':
        query = ("SELECT * FROM child")
        values = ()
    elif table_param == 'lunch_option':
        query = ("SELECT * FROM lunch_option")
        values = ()
    elif table_param == 'aggr_group_by':
        query = ("SELECT age, COUNT(age) AS age_count FROM birthday_to_age GROUP BY age")
        values = ()
    elif table_param == 'division':
        query = ("SELECT member_id FROM child WHERE NOT EXISTS(SELECT name FROM activity EXCEPT (SELECT activity_name FROM child_does_activity WHERE child_member_id = member_id))")
        values = ()
    elif table_param == 'schedule':
        try:
            values = ()
            select_values = []
            monday = sanitize_input(params['monday'], ['true', 'false'])
            if monday=='true':
                select_values.append("monday")
            tuesday = sanitize_input(params['tuesday'], ['true', 'false'])
            if tuesday=='true':
                select_values.append("tuesday")
            wednesday = sanitize_input(params['wednesday'], ['true', 'false'])
            if wednesday=='true':
                select_values.append("wednesday")
            thursday = sanitize_input(params['thursday'], ['true', 'false'])
            if thursday=='true':
                select_values.append("thursday")
            friday = sanitize_input(params['friday'], ['true', 'false'])
            if friday=='true':
                select_values.append("friday")
            saturday = sanitize_input(params['saturday'], ['true', 'false'])
            if saturday=='true':
                select_values.append("saturday")
            sunday = sanitize_input(params['sunday'], ['true', 'false'])
            if sunday=='true':
                select_values.append("sunday")
            start_time = sanitize_input(params['start_time'], ['true', 'false'])
            if start_time=='true':
                select_values.append("start_time")
            end_time = sanitize_input(params['end_time'], ['true', 'false'])
            if end_time=='true':
                select_values.append("end_time")
            if len(select_values)==0:
                query = ("SELECT * FROM `schedule`")
            else:
                query = (f"SELECT schedule_id, {', '.join(select_values)} FROM `schedule`")
                print(query)
        except Exception as e:
            print(e)            
            return {
                'statusCode': 400,
                'headers': {
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Credentials': True
                },
                'body': 'Invalid input specified'
            }
    elif table_param == 'delete':
        try:
            values = ()
            child_id = params['child_id']
            query = ("SELECT * FROM child WHERE member_id = %s")
            values = (child_id,)
            print(query)
        except Exception as e:
            print(e)            
            return {
                'statusCode': 400,
                'headers': {
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Credentials': True
                },
                'body': 'Invalid input specified'
            }
            #nic code start
    elif table_param == 'family_search':
        try:
            family_id = params.get('family_id')
            if family_id:
                fid = params['fid']
                query = ("SELECT * FROM family WHERE family_id = %s")
                values = (fid,)
            else:
                query = ("SELECT * FROM family")
        except Exception as e:
            print(e)            
            return {
                'statusCode': 400,
                'headers': {
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Credentials': True
                },
                'body': 'Invalid input specified'
            }
    elif table_param == 'join':
        try:
            branch_id = params.get('branch_id')
            if branch_id:
                bid = params['bid']
                query =("SELECT ct.name AS caretaker_name, ct.employee_id, ct.branch_id, cb.childcare_address AS branch_address FROM caretaker ct JOIN childcare_branches cb ON ct.branch_id = cb.branch_id WHERE ct.branch_id = %s;")
                values = (bid,)
            else:
                query = ("SELECT ct.name AS caretaker_name, ct.employee_id, ct.branch_id, childcare_branches.childcare_address AS branch_address FROM caretaker ct JOIN childcare_branches ON ct.branch_id = childcare_branches.branch_id")
        except Exception as e:
            print(e)            
            return {
                'statusCode': 400,
                'headers': {
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Credentials': True
                },
                'body': 'Invalid input specified'
            }
    elif table_param == 'nest-ag':
        try:
            # family_id = params.get('family_id')
            # if family_id:
            query= ("SELECT f.family_id, AVG(EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM c.birthday)) AS avg_child_age FROM family_member f JOIN child c ON f.member_id = c.member_id GROUP BY f.family_id;")
            # else:
                # raise Exception("Missing 'family_id' parameter")
        except Exception as e:
            print(e)            
            return {
                'statusCode': 400,
                'headers': {
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Credentials': True
                },
                'body': 'Invalid input specified'
            }
    #         #nic code end            
    elif table_param == 'activity':
        try:
            values = ()
            activity_name = params['activity_name']
            activity_type = params['activity_type']
            employee_id = params['employee_id']
            query = ("INSERT INTO activity (name, type, employee_id) VALUES (%s, %s, %s)")
            values = (activity_name, activity_type, employee_id,)
            print(query)
        except Exception as e:
            print(e)            
            return {
                'statusCode': 400,
                'headers': {
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Credentials': True
                },
                'body': 'Invalid input specified'
        }
    elif table_param == 'capacity':
        try:
            capacity = params['capacity']
            values = (int(capacity),)
            query = ('SELECT SUM(room_capacity) AS capacity, cbr.branch_id FROM childcare_branch_room cbr, childcare_branches cb WHERE cbr.branch_id=cb.branch_id GROUP BY branch_id HAVING SUM(room_capacity) >= %s')
            print(query)
            print(capacity)
        except Exception as e:
            print(e)            
            return {
                'statusCode': 400,
                'headers': {
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Credentials': True
                },
                'body': 'Invalid input specified'
            }

    else:
        query = ("")
        values = ()
    
    cursor.execute(query, values)

    output = []
    
    if cursor.rowcount == 0:
        print("Query prodced 0 rows")
    else:
        for row in cursor:
            print(row)
            output.append(row)
    
    cursor.close()
    
    cnx.close()    
    
    return {
        'statusCode': 200,
        'headers': {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': True
        },
        'body': json.dumps(output,indent=4, sort_keys=True, default=str)
    }
