{
  "inputs":
            {
              "bucket": "bucket_name",
              "key_filters":
                              [
                                ["tokenize", "-", 1],
                                ["between", "1343779200", "1349049600"]
                              ]
            },
  "query":
          [
            {
              "map":
                    {
                      "language":"javascript",
                      "source": "function(object)
                                {
                                    var data = Riak.mapValuesJson(object)[0];
                                    
                                    if(data.a == 'a' || data.b == 'b' || data.c == 'c')
                                      return [data];
                                    else
                                      return [];
                                }
                                ",
                      "keep":false
                    }
            },
            {
              "reduce":
                        {
                          "language":"javascript",
                          "name":"Riak.reduceSort",
                          "keep":false
                        }
            },
            {
              "reduce":
                        {
                          "language":"javascript",
                          "name":"Riak.reduceLimit",
                          "arg":3,
                          "keep":true
                        }
            }
          ]
}