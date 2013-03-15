{
  "inputs":
            {
              "bucket":"bucket_name",
              "key_filters":
                              [
                                ["tokenize", "-", 1],
                                ["between", "1314835200", "1354320000"]
                              ]
            },

  "query":
            [
              {
                "map":
                        {
                          "language":"javascript",
                          "source": "function map(object)
                                    {
                                      var data = Riak.mapValuesJson(object)[0];
  
                                      if(data.a && data.a == 'a')
                                      {
                                        return [[object.bucket, object.key]];
                                      }
                                      else
                                        return [];
                                    }
                                    ",
                          "keep":false
                        }
              },
              {
                "map":
                        {
                          "language":"javascript",
                          "source": "function map(object)
                                    {
                                      var data = Riak.mapValuesJson(object)[0];
  
                                      if(data.b == 'b' || data.b == 'bb')
                                        return [[object.bucket, object.key]];
                                      else
                                        return [];
                                    }
                                    ",
                          "keep":false
                        }
              },
              {
                "map":
                        {
                          "language":"javascript",
                          "source": "function map(object)
                                    {
                                      var data = Riak.mapValuesJson(object)[0];
                                      var result = {};
                                      
                                      if(data.c)
                                      {
                                        result[data.c] = data;
                                        return [result];
                                      }
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
                            "source": "function reduce(values)
                                      {
                                        return  [
                                                  values.reduce(
                                                                  function(acc, item)
                                                                  {
                                                                    for(d in item)
                                                                    {
                                                                      if(acc[d])
                                                                        acc[d] += item[d];
                                                                      else
                                                                        acc[d] = item[d];
                                                                      return acc;
                                                                    }
                                                                  }
                                                                )
                                                ];
                                      }
                                      ",
                            "keep":true
                          }
              }
            ]
}