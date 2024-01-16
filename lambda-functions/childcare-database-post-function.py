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
    
    params = json.loads(event['body'])

    cnx = mysql.connector.connect(user='CPSC304', password='Cpsc#304project',
                                  host='childcare-database.cwsbzrg5sjrx.us-west-2.rds.amazonaws.com',
                                  database='childcare_db')
                                  
    cursor = cnx.cursor(dictionary=True)
    
    table_param = params['table']

    
    if table_param == 'activity':
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
    elif table_param == 'delete':
        try:
            values = ()
            child_id = params['child_id']
            query = ("DELETE FROM child WHERE member_id = %s")
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
    #start nic code
    elif table_param == 'updateBranch':
        try:
            fid = params['fid']
            bid = params['bid']
            values = (bid, fid)
            #if theres only 1 fid change its bid to bid
            if fid:
                query = "UPDATE family SET branch_id = %s WHERE family_id = %s"
            
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
        #end nic code
    else:
        query = ("")
        values = ()
    
    try:
        cursor.execute(query, values)
        affected_rows = cursor.rowcount  

        if affected_rows == 0:
            output = {
                "status": "failed",
                "exception": "No rows were affected. Child may not exist."
            }
        else:
            cnx.commit()
            output = {
                "status": "succeeded"
            }
    except Exception as e:
        output = {
            "status" : "failed",
            "exception": str(e)
        }
    
    return {
        'statusCode': 200,
        'headers': {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': True
        },
        'body': json.dumps(output,indent=4, sort_keys=True, default=str)
    }
